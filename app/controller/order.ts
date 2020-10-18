import { OrderList } from '../interface/order';
import  OrderServer from '../service/order';
import * as Joi from '@hapi/joi';
import * as Koa from 'koa';

const schema = Joi.object({
  page: Joi.number().required(),
  size: Joi.number().required(),
  userId: Joi.string()
});

class Order {

  async getList(ctx: Koa.Context): Promise<any> {
    const currBody: OrderList = ctx.request.body;
    const { error } = schema.validate(currBody);
    if (error) {
      const err = new global.errs.ParameterException(error);
      throw err;
    }
    try {
      const result = await OrderServer.login(currBody);
      ctx.body = result;
    } catch (err) { }
  }
}

export default new Order;
