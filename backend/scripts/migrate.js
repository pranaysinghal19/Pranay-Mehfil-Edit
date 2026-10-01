const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('../src/db/pool');

const direction = process.argv[2] || 'up';
const migrationsDir = path.join(__dirname, '..', 'migrations');

function splitMigration(sql) {
  const parts = sql.split(/^-- DOWN\s*$/m);
  return {
    up: parts[0].replace(/^-- UP\s*$/m, '').trim(),
    down: (parts[1] || '').trim(),
  };
}

function checksum(sql) {
  return crypto.createHash('sha256').update(sql).digest('hex');
}

async function ensureTable(client) {
  await client.query(
    'CREATE TABLE IF NOT EXISTS _migrations (' +
    'name TEXT PRIMARY KEY, ' +
    'checksum TEXT, ' +
    'applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())'
  );

  await client.query(
    'ALTER TABLE _migrations ADD COLUMN IF NOT EXISTS checksum TEXT'
  );
}

async function migrateUp(client, files) {
  const rows = await client.query('SELECT name, checksum FROM _migrations');
  const applied = new Map(rows.rows.map((row) => [row.name, row.checksum]));

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    const fileChecksum = checksum(sql);

    if (applied.has(file)) {
      const recorded = applied.get(file);

      if (!recorded) {
        await client.query(
          'UPDATE _migrations SET checksum = $1 WHERE name = $2',
          [fileChecksum, file]
        );
        console.log('Recorded checksum for ' + file);
        continue;
      }

      if (recorded !== fileChecksum) {
        throw new Error(
          'Applied migration was modified: ' + file +
          '. Create a new migration instead of editing an applied one.'
        );
      }

      continue;
    }

    const migration = splitMigration(sql);

    await client.query('BEGIN');
    try {
      await client.query(migration.up);
      await client.query(
        'INSERT INTO _migrations (name, checksum) VALUES ($1, $2)',
        [file, fileChecksum]
      );
      await client.query('COMMIT');
      console.log('Applied ' + file);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }
}

async function migrateDown(client, files) {
  const latest = await client.query(
    'SELECT name FROM _migrations ORDER BY applied_at DESC LIMIT 1'
  );

  if (!latest.rowCount) {
    console.log('Nothing to roll back.');
    return;
  }

  const file = latest.rows[0].name;
  if (!files.includes(file)) throw new Error('Missing migration file: ' + file);

  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  const migration = splitMigration(sql);
  if (!migration.down) throw new Error('Migration has no DOWN section: ' + file);

  await client.query('BEGIN');
  try {
    await client.query(migration.down);
    await client.query('DELETE FROM _migrations WHERE name = $1', [file]);
    await client.query('COMMIT');
    console.log('Rolled back ' + file);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

async function main() {
  const client = await pool.connect();

  try {
    await ensureTable(client);

    const files = fs.readdirSync(migrationsDir)
      .filter((file) => /^\d+_.*\.sql$/.test(file))
      .sort();

    if (direction === 'up') await migrateUp(client, files);
    else if (direction === 'down') await migrateDown(client, files);
    else throw new Error('Use: node scripts/migrate.js up|down');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
