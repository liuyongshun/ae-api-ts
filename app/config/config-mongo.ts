// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const DB_URL: string = 'mongodb+srv://liuyongshun:kuaile0716@cluster0-pmxhd.mongodb.net/react?retryWrites=true&w=majority';
// const DB_URL: string = 'mongodb://localhost:27017/ae_platform';

mongoose.connect(DB_URL);
mongoose.connection.on('connected',() => {
  console.log('链接数据库成功!');
});
/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error', (err: string) => {
  console.log('链接数据库失败: '+ err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected', () => {
  console.log('数据库断开链接');
});

// module.exports = mongoose
export default mongoose
