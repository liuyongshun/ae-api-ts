import { ErrMsg } from '../interface/errors';
class HttpException extends Error {
  public code: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string = '服务器异常', code: number = 10000, status:number = 400) {
    super();
    this.code = code;
    this.status = status;
    this.msg = msg;
    this.data = null;
  }
}

class ParameterException extends HttpException {
  public code: number
  public status: number
  public msg: string
  public data: null

  constructor(errors: ErrMsg) {
    super();
    this.status = 400;
    this.msg = this.filterErr(errors);
    this.code = 10000;
    this.data = null;
  }

  filterErr = (err: ErrMsg): string => {
    const msg = err.details[0].message
    return msg;
  }
}

class NotFound extends HttpException {
  public code: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, code: number) {
    super();
    this.msg = msg || '资源未找到';
    this.code = code || 10001;
    this.status = 404;
    this.data = null;
  }
}

class AuthFailed extends HttpException {
  public code: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, code: number) {
    super();
    this.msg = msg || '请求失败';
    this.code = code || 10002;
    this.status = 500;
    this.data = null;
  }
}

class Forbidden extends HttpException {
  public code: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, code: number) {
    super();
    this.msg = msg || '无权限';
    this.code = code || 10003;
    this.status = 403;
    this.data = null;
  }
}

class RequestTypeError extends HttpException {
  public code: number
  public status: number
  public msg: string
  public data: null

  constructor(msg: string, code: number) {
    super();
    this.msg = msg || '请求方法错误';
    this.code = code || 10004;
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
