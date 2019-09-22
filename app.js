const Koa = require('koa');
const {join} = require('path');
const static = require('koa-static');
const body = require('koa-body');
const logger = require('koa-logger');
const compress = require('koa-compress');
const session = require('koa-session');
const cors = require('@koa/cors');

const userRouter = require('./routers/userRouter');

const app = new Koa;

//请求资源压缩
app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))

//session配置
//session签名
app.keys = ["陈乾坤"]
//seesion配置对象
CONFIG = {
    key: "sessionID",
    maxAge: 36e5,
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: true
}
//配置session
app.use(session(CONFIG,app))

//配置静态资源
app.use(static(join(__dirname, "public")))
    .use(body())//监听所有post
    .use(cors())//解决跨域问题

//配置路由,要放在配置静态资源后
app.use(userRouter.routes()).use(userRouter.allowedMethods())

//注册日志模块，控制台打印日志
app.use(logger())

app.listen('3000',()=>{
    console.log('项目启动成功');
})