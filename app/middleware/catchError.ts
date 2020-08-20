const catchError = async (ctx: any, next: any): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if(error.errorCode) {
      ctx.body = {
        message: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      };
    } else {
      ctx.body = {
        message: '未知的错误',
      };
    }
  }
}
export default catchError;
