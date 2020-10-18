import { OrderList } from '../interface/order';
import { OrderMongo } from '../model/order';

class OrderServer {
  async login (curr: OrderList): Promise<Record<string, unknown>> {
    const list = await OrderMongo.findOne();
    return list;
  }
}
export default new OrderServer;
