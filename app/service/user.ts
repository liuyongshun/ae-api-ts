import { User } from '../interface/user';

class uersMsgService {
  async login (curr: User, isExist: User):  Promise<string> {
    if (isExist) {
      if (curr.password === isExist.password) {
        return new global.success.HttpSuccess(true);
      }
    }
    return new global.errs.HttpException('用户名或密码错误');
  }

  // async register(curr, isExist) {
    // const { ctx } = this;
    // if (isExist && isExist.length > 0) {
    //   return ctx.service.error.dealError('用户名已存在');
    // }
    // const add = ctx.model.User(curr);
    // add.save();
    // return ctx.service.success.dealSuccess('注册成功!');
  // }
}
export default new uersMsgService;
