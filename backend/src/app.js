const express = require('express');
const { config } = require('./config');
const { requestId } = require('./middleware/requestId');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');
const healthRouter = require('./routes/health');

function corsAllowList(req, res, next) {
  const origin = req.headers.origin;
  if (!origin || config.corsOrigins.includes(origin)) {
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Idempotency-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    return next();
  }

  return res.status(403).json({
    error: { code: 'CORS_ORIGIN_DENIED', message: 'Origin is not allow-listed.' },
  });
}

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(requestId);
  app.use(corsAllowList);
  app.use(express.json({ limit: '1mb' }));

  app.use('/health', healthRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
