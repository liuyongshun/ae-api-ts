'use strict';
import mongoose from '../config/config-mongo';
const Schema: any = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  againPassword: { type: String },
  mobile: { type: String },
});

export const userMsgMongo = mongoose.model('User', UserSchema);
