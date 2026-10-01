require('dotenv').config();

function numberFromEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(name + ' must be a number');
  return value;
}

function listFromEnv(name, fallback) {
  return (process.env[name] || fallback)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

const config = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  port: numberFromEnv('PORT', 3000),
  corsOrigins: listFromEnv('CORS_ORIGINS', 'http://localhost:5173'),
  jwtSecret: process.env.JWT_SECRET || '',
  db: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'mehfil_dev',
    password: process.env.DB_PASSWORD || 'password',
    port: numberFromEnv('DB_PORT', 5432),
    ssl: process.env.DB_SSL === 'true',
  },
});

function validateConfig() {
  if (config.env !== 'production') return;

  const problems = [];

  if (!config.jwtSecret || config.jwtSecret.includes('replace_')) {
    problems.push('JWT_SECRET must be a real production secret');
  }

  if (config.db.password === 'password' || config.db.password === 'your_password_here') {
    problems.push('DB_PASSWORD must not use a development placeholder');
  }

  if (!config.corsOrigins.length) {
    problems.push('CORS_ORIGINS must contain at least one production frontend origin');
  }

  if (config.corsOrigins.some((origin) => origin === '*')) {
    problems.push('CORS_ORIGINS cannot use wildcard * in production');
  }

  if (problems.length) {
    throw new Error('Invalid production configuration: ' + problems.join('; '));
  }
}

validateConfig();

module.exports = { config, validateConfig };
