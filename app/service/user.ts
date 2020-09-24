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
    if (isExist && isExist.length) {
      return new global.errs.HttpException('用户已存在');
    }
    // const newUser = new userMsgMongo(curr);
    console.log(curr, 'llll')
    const aa = userMsgMongo.updateOne({ mobile: curr.mobile }, curr, {upsert: true});
    console.log(aa)
    return new global.success.HttpSuccess(true, '注册成功！');
  }
}
export default new uersMsgService;
