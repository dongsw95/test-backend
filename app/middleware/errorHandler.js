module.exports = (options) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.swLog.error('err Handler:', err);

      let error = err.message;

      // validate error
      if (err.message && err.message === 'Validation Failed') {
        const validateInfo = err.errors[0];
        error = `[Field] ${validateInfo.field} [code] ${validateInfo.code} [message] ${validateInfo.message}`;
      }

      ctx.body = {
        status: 'error',
        error
      };
    }
  };
};
