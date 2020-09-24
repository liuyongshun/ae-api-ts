// import { userMsgMongo } from '../model/user';
import { User, RUser } from '../interface/user';
import  uersMsgService from '../service/user';
import * as Joi from '@hapi/joi';
import * as Koa from 'koa';

const schema = Joi.object({
  userName: Joi.string().min(1).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const regSchema = Joi.object({
  userName: Joi.string().min(1).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  againPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  mobile: Joi.string().pattern(new RegExp('^1\\d{10}')).required(),
});

class UserMsgController {

  async login(ctx: Koa.Context): Promise<any> {
    const currBody: User = ctx.request.body;
    const { error } = schema.validate(currBody);
    if (error) {
      const err = new global.errs.ParameterException(error);
      throw err;
    }
    try {
      const result = await uersMsgService.login(currBody);
      ctx.body = result;
    } catch (err) { }
  }

  async register(ctx: Koa.Context): Promise<any> {
    const regBody: RUser = ctx.request.body;
    const { error } = regSchema.validate(regBody);
    if (error) {
      const err = new global.errs.ParameterException(error);
      throw err;
    }
    try {
      const result = await uersMsgService.register(regBody);
      ctx.body = result;
    } catch (err) {}
  }
}

export default new UserMsgController;
