import { User } from '../interface/user';

class uersMsgService {
  async login (curr: User, isExist: User):  Promise<string> {
    if (isExist) {
      if (curr.password === isExist.password) {
        return '登陆成功!';
      }
      return '密码输入错误';
    }
    return '用户不存在';
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
