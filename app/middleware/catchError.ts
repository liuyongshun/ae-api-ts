const catchError = async (ctx: any, next: any): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if(error.code) {
      ctx.body = {
        code: error.code,
        message: error.msg,
        status: error.status
      };
    } else {
      ctx.body = {
        code: 10000,
        status: 500,
        message: '未知的错误',
      };
    }
  }
}
export default catchError;
