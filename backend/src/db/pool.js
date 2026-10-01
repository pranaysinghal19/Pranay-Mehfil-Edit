const { Pool } = require('pg');
const { config } = require('../config');

const pool = new Pool({
  ...config.db,
  ssl: config.db.ssl ? { rejectUnauthorized: false } : false,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error', error);
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  withTransaction: async (work) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await work(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};
