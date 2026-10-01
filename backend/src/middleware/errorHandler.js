function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  console.error({
    requestId: req.requestId,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });

  const status = error.status || 500;
  res.status(status).json({
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: status >= 500 ? 'Something went wrong.' : error.message,
      requestId: req.requestId,
    },
  });
}

module.exports = { errorHandler };
