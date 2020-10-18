'use strict';
import mongoose from '../config/config-mongo';
const Schema: any = mongoose.Schema;

const OrderSchema = new Schema({
  id: { type: String },
  orderName: { type: String },
  orderPrice: { type: Number },
  createTime: { type: Number },
  address: { type: String },
  status: { type: Number },
  img: { type: Number },
  count: { type: Number }
});

export const OrderMongo = mongoose.model('Order', OrderSchema);
