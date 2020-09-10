import { ErrMsg } from '../interface/errors';
class HttpException extends Error {
  public errorCode: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string = '服务器异常', errorCode: number = 10000, status:number = 400) {
    super();
    this.errorCode = errorCode;
    this.status = status;
    this.msg = msg;
    this.data = null;
  }
}

class ParameterException extends HttpException {
  public errorCode: number
  public status: number
  public msg: string
  public data: null

  constructor(errors: ErrMsg) {
    super();
    this.status = 400;
    this.msg = this.filterErr(errors) || '参数错误';
    this.errorCode = 10000;
    this.data = null;
  }

  filterErr = (err: ErrMsg): string => {
    const msg = err.details[0].message;
    return msg;
  }
}

class NotFound extends HttpException {
  public errorCode: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10001;
    this.status = 404;
    this.data = null;
  }
}

class AuthFailed extends HttpException {
  public errorCode: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '请求失败';
    this.errorCode = errorCode || 10002;
    this.status = 500;
    this.data = null;
  }
}

class Forbidden extends HttpException {
  public errorCode: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '无权限';
    this.errorCode = errorCode || 10003;
    this.status = 403;
    this.data = null;
  }
}

class RequestTypeError extends HttpException {
  public errorCode: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, errorCode: number) {
    super();
    this.msg = msg || '请求方法错误';
    this.errorCode = errorCode || 10004;
    this.status = 405;
    this.data = null;
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
