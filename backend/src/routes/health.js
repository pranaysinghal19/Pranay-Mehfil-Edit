const express = require('express');
const { query } = require('../db/pool');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    await query('SELECT 1');
    res.json({
      status: 'ok',
      database: 'ok',
      service: 'mehfil-api',
      requestId: req.requestId,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
