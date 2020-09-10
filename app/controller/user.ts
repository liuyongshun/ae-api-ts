import { userMsgMongo } from '../model/user';
import { User } from '../interface/user';
import  uersMsgService from '../service/user';
import * as Joi from '@hapi/joi';

const schema = Joi.object({
  userName: Joi.string().min(1).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

class UserMsgController {

  async login(ctx: any): Promise<void> {
    const currBody: User = ctx.request.body;
    const { error } = schema.validate(currBody);
    if (error) {
      const err = new global.errs.ParameterException(error);
      throw err;
    }
    try {
      const queryData = await userMsgMongo.findOne({ userName: currBody.userName });
      const resulet = await uersMsgService.login(currBody, queryData);
      ctx.body = resulet;
    } catch (err) { }
  }

  // async register() {
    // const { ctx } = this;
    // ctx.validate(registerRule);
    // const currBody = ctx.request.body;
    // const res = {};
    // const queryExist = await userMsgMongo.find({ userName: currBody.userName });
    // const resulet = await ctx.service.user.register(currBody, queryExist);
    // Object.assign(res, resulet);
    // ctx.body = res;
  // }
}

export default new UserMsgController;
