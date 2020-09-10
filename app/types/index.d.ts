declare let Joi: any;
declare global {
  namespace NodeJS {
    interface Global {
      errs: any;
    }
  }
}