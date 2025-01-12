module.exports = (options) => {
  return async function checkToken(ctx, next) {
    const token = ctx.request.get('token');
    try {
      const ret = ctx.app.jwt.verify(token, 'wiredcraft');
      const userId = ret.id;
      const user = await ctx.service.user.getUserById(userId);
      if (!user || user.deletedAt) {
        throw new Error('Token Error');
      }
      ctx.headers.userId = userId;
    } catch (e) {
      ctx.swLog.error('checkToken Error:', e);
      throw new Error('Token Error');
    }
    await next();
  };
};
