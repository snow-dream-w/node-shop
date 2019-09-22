const Koa = require('koa');
const {join} = require('path');
const static = require('koa-static');
const body = require('koa-body');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const userRouter = require('./routers/userRouter');

const app = new Koa;

// app.use(body())
//配置静态资源
app.use(static(join(__dirname, "public")))
    .use(body())//监听所有post
    .use(cors())//解决跨域问题

//解决跨域问题
// app.use(cors())

//配置路由
app.use(userRouter.routes()).use(userRouter.allowedMethods())

//注册日志模块，控制台打印日志
app.use(logger())

app.listen('3000',()=>{
    console.log('项目启动成功');
})