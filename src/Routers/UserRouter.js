const Router = require('koa-router')
const fs = require('fs')
const {join} = require('path')

const user = require('../Controller/UserController')
const upload = require('../Utils/upload')

const router = new Router

//请求首页
router.get("/", async (ctx) => {
    ctx.body = fs.readFileSync(join(__dirname, "../public/index.html"),'utf-8');
});

//登录
router.post("/user/login",user.loginUserAccount);

//注册
router.post("/user/register",user.registerUserAccount);

//获取个人信息
router.get("/user/person/:id",user.keepLogin,user.getUserInfo);

//上传个人头像
router.post("/user/upload",upload.single('file'),user.uploadUserAvatar);

//编辑基本资料
router.post("/user/edit/info",user.keepLogin,user.editUserInfo);

//修改密码
router.post("/user/edit/password",user.keepLogin,user.editUserPassword);

//退出登录
router.get("/user/logout",user.keepLogin,user.logout);

module.exports = router