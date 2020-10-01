import { RUser, User } from '../interface/user';
import { userMsgMongo } from '../model/user';

class uersMsgService {
  async login (curr: User): Promise<Record<string, unknown>> {
    const isExist = await userMsgMongo.findOne({ userName: curr.userName });
    if (isExist) {
      if (curr.password === isExist.password) {
        return new global.success.HttpSuccess(true);
      }
    }
    return new global.errs.HttpException('用户名或密码错误');
  }

  async register(curr: RUser): Promise<Record<string, unknown>> {
    const isExist = await userMsgMongo.findOne({ mobile: curr.mobile });
    console.log(isExist, 'ffff')
    if (isExist) {
      return new global.errs.HttpException('手机号已绑定');
    }
    userMsgMongo.create(curr, (err: any) => {
      console.log(err);
    });
    return new global.success.HttpSuccess(true, '注册成功！');
  }
}
export default new uersMsgService;
