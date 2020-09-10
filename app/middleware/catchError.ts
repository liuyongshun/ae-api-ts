const catchError = async (ctx: any, next: any): Promise<void> => {
  try {
    await next();
  } catch (error) {
    console.log(error, '888')
    if(error.errorCode) {
      ctx.body = {
        code: error.code,
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
