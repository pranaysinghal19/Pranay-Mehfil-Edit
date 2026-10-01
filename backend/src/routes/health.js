const express = require('express');
const { query } = require('../db/pool');

const router = express.Router();

router.get('/live', (req, res) => {
  res.json({
    status: 'ok',
    service: 'mehfil-api',
    check: 'liveness',
    requestId: req.requestId,
  });
});

async function readiness(req, res, next) {
  try {
    await query('SELECT 1');
    res.json({
      status: 'ok',
      service: 'mehfil-api',
      database: 'ok',
      check: 'readiness',
      requestId: req.requestId,
    });
  } catch (error) {
    error.code = 'DATABASE_UNAVAILABLE';
    error.status = 503;
    next(error);
  }
}

router.get('/', readiness);
router.get('/ready', readiness);

module.exports = router;
