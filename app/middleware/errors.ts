
class HttpException extends Error {
  public errorCode: number
  public code: number
  public msg: string

  constructor(msg: string = '服务器异常', errorCode: number = 10000, code:number = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  public errorCode: number
  public code: number
  public msg: string

  constructor(msg: string, errorCode: number) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class NotFound extends HttpException {
  public errorCode: number
  public code: number
  public msg: string

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10001;
    this.code = 404;
  }
}

class AuthFailed extends HttpException {
  public errorCode: number
  public code: number
  public msg: string

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '请求失败';
    this.errorCode = errorCode || 10002;
    this.code = 500;
  }
}

class Forbidden extends HttpException {
  public errorCode: number
  public code: number
  public msg: string

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '无权限';
    this.errorCode = errorCode || 10003;
    this.code = 403;
  }
}

class RequestTypeError extends HttpException {
  public errorCode: number
  public code: number
  public msg: string

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '请求方法错误';
    this.errorCode = errorCode || 10004;
    this.code = 405;
  }
}

export default {
    HttpException,
    ParameterException,
    NotFound,
    AuthFailed,
    Forbidden,
    RequestTypeError
}
