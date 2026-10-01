require('dotenv').config();

function numberFromEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(name + ' must be a number');
  return value;
}

const config = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  port: numberFromEnv('PORT', 3000),
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
  db: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'mehfil_dev',
    password: process.env.DB_PASSWORD || 'password',
    port: numberFromEnv('DB_PORT', 5432),
    ssl: process.env.DB_SSL === 'true',
  },
});

module.exports = { config };
