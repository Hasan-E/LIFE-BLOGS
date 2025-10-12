"use strict";

/* ============================================ */
/*                LIFE BLOGS API                */
/* ============================================ */

module.exports = (err, req, res, next) => {
    
  const statusCode = res.errorStatusCode ?? 500;

  res.status(statusCode).send({
    error: false,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
  });
};
