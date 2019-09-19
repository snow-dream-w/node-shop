const Koa = require('koa')
const static = require('koa-static')
// const router = require('./routers/router')
const logger = require("koa-logger")
const body = require('koa-body')
const { join } = require('path')
const session = require('koa-session')
const compress = require('koa-compress')
const cors = require('@koa/cors')

const app = new Koa

//session需要的签名
app.keys = ["陈乾坤"]
//session配置对象
CONFIG = {
    key: "Sid",
    maxAge: 36e5,
    overwerite: true,
    httpOnly: true,
    signed: false,
    rolling: true
}

//注册日志模块，控制台打印日志
app.use(logger())

//注册压缩资源模块，压缩请求资源
app.use(compress({
    // filter(content_type) {
    //     return /text/i.test(content_type)
    // },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))

//配置session，可使用后台session
app.use(session(CONFIG, app))

//配置koa-body 处理post请求数据
//app.use(body())

//配置静态资源目录
app.use(static(join(__dirname, "public")))
    .use(body())//监听所有post
    .use(cors())//解决跨域问题

app.use(cors())//解决跨域问题

//注册路由
// app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log("项目启动");
})

//创建管理员用户，如果管理员已经存在则返回
{
    const { db } = require('./utils/connect')
    // const UserSchema = require('./Schema/user')
    const encrypt = require('./utils/encrypt')

    //通过db创建操作user数据库的模型对象
    // const User = db.model("users", UserSchema)

    // User
    //     .find({ username: "admin" })
    //     .then(data => {
    //         if (data.length === 0) {
    //             new User({
    //                 username: "admin",
    //                 password: encrypt("admin"),
    //                 role: 666,
    //                 commentNum: 0,
    //                 articleNum: 0
    //             })
    //                 .save()
    //                 .then(data => {
    //                     console.log("管理员信息" + data);
    //                 })
    //                 .catch(err => {
    //                     console.log("管理员信息检查失败");
    //                 })

    //         } else {
    //             console.log("管理员已经存在");
    //         }
    //     })
}
