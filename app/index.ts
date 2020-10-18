import * as Koa from 'koa';
import * as koabody from 'koa-body';
import allRoutes from './router/index';
import catchError from './middleware/catchError';
import errors from './middleware/errors';
import success from './middleware/success';

declare global {
  namespace NodeJS {
    interface Global {
      errs: any;
      success: any;
    }
  }
}

global.errs = errors;
global.success = success;

const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa();

// app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method == 'OPTIONS') {
//     ctx.body = 200;
//   } else {
//     await next();
//   }
// });

app.use(cors({
  origin: function () {
      return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  Expires: new Date(Date.now() + 20000),
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTION', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Length', 'credentials', 'X-Access-Token', 'Cache-Control', 'Pragma', 'X-Requested-With']
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

app.listen(7777, '0.0.0.0', () => {
  console.log('启动成功！端口：7777');
});

