const Koa = require('koa');
const {join} = require('path');
const static = require('koa-static');
const body = require('koa-body');
const logger = require('koa-logger');
const compress = require('koa-compress');
const session = require('koa-session');
const cors = require('@koa/cors');

//导入路由
const userRouter = require('./src/Routers/UserRouter');
const goodsRouter = require('./src/Routers/GoodsRouter');
const addressRouter = require('./src/Routers/AddressRouter');
const orderRouter = require('./src/Routers/OrderRouter');
const commentRouter = require('./src/Routers/CommentRouter');
const answerRouter = require('./src/Routers/AnswerRouter');
const carRouter = require('./src/Routers/CarRouter');

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
app.use(goodsRouter.routes()).use(goodsRouter.allowedMethods())
app.use(addressRouter.routes()).use(addressRouter.allowedMethods())
app.use(orderRouter.routes()).use(orderRouter.allowedMethods())
app.use(commentRouter.routes()).use(commentRouter.allowedMethods())
app.use(answerRouter.routes()).use(answerRouter.allowedMethods())
app.use(carRouter.routes()).use(carRouter.allowedMethods())

//注册日志模块，控制台打印日志
app.use(logger())
app.listen('3000',()=>{
    console.log('项目启动成功');
});

// 创建管理员
(async function admin(){
    const User = require('./src/Models/UserModel')
    const encrypt = require('./src/Utils/encrypt')
    await User.find({telephone: "admin"})
        .then(data => {
            if(data.length === 0) {
                new User({
                    telephone: '15824795534',
                    name: '系统管理员',
                    password: encrypt('123456'),
                    role: 666
                }).save()
                .then(data => {
                    User.updateOne({telephone: '15824795534'},{$set: {telephone: 'admin'}},{new: true},(err,data)=>{
                        if(err){
                            console.log("管理员信息检查失败");
                        }else{
                            console.log("管理员信息创建成功");
                        }
                    })
                }).catch(err => {
                    console.log("管理员信息检查失败");
                })
            } else {
                console.log('管理员已存在');
            }
        })
})()
