const Router = require('koa-router')
const fs = require('fs')
const {join} = require('path')

const user = require('../Controller/UserController')

const router = new Router

//请求首页
router.get("/", async (ctx) => {
    ctx.body = fs.readFileSync(join(__dirname, "../public/index.html"),'utf-8');
});

//登录
router.post("/user/login",user.loginAccount);

//注册
router.post("/user/register",user.register);

//退出登录
router.get("/user/logout",user.keepLogin,user.logout);

module.exports = router