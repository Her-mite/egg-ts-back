module.exports = () => {
  // 统一错误处理
  return async function errorHandler(ctx, next) {
    try {
      await next();
      ctx.body = {
        status: 200,
        data: ctx.result,
      };
    } catch (error) {
      ctx.app.emit('error', error, ctx);
      ctx.body = {
        status: 500,
        message: error,
        data: [],
      };
    }
  };
};
