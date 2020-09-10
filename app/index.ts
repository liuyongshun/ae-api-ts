import * as Koa from 'koa';
import * as koabody from 'koa-body';
import allRoutes from './router/index';
import catchError from './middleware/catchError';
import errors from './middleware/errors';

global.errs = errors;

const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa();

app.use(cors({
  origin: function () {
      return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(catchError);
app.use(koabody({}));
app.use(bodyParser());

app.use(allRoutes.routes());

// 错误处理
app.on('error', err => {
  console.log('服务错误', err)
});

app.listen(3433);
console.log('启动成功！端口：3433');
