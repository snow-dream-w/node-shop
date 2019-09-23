const UserDao = require('../Dao/UserDao')
const userDao = new UserDao()
const UserService = require('../Service/UserService')
const userService = new UserService(userDao)
const encrypt = require("../Utils/encrypt")

/**
 * 用户注册
 */
exports.register = async (ctx) => {
    //接收参数
    const user = ctx.request.body

    //密码加密
    user.password = encrypt(user.password)

    //填入部分默认值
    user['name'] = user.telephone
    user['money'] = 0
    user['busNum'] = 0

    //发起保存请求
    await new Promise(async (resolve, reject) => {
        let result = await userService.registerAccount(user)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}

/**
 * 用户登录
 */
exports.loginAccount = async (ctx) => {
    //取参数
    const user = ctx.request.body
    const userId = user.telephone
    const password = user.password
    //查找数据
    await new Promise(async (resolve, reject) => {
        let result = await userService.loginAccount(userId,password)
        if(result.status === 0){
            return reject(result.data)
        }
        return resolve(result.data)
    }).then((data) => {
        //给客户端设置cookie
        ctx.cookies.set("uid", data.telephone, {
            domin: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: false, //true不让客户端访问这个cookie
            overwrite: false,
            // signed: false//默认是true
        })
        ctx.cookies.set("username", data.name, {
            domin: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: false, //true不让客户端访问这个cookie
            overwrite: false,
            // signed: false//默认是true
        })
        ctx.cookies.set("role", data.role, {
            domin: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: true, //不让客户端访问这个cookie
            overwrite: false,
            // signed: false
        })

        //后台设置session
        ctx.session = {
            uid: data.telephone,
            role: data.role
        }
        ctx.body = {
            status: 1,
            data: data
        }
    }).catch(err => {
        ctx.body = {
            status: 0,
            data: err
        }
    })
}

/**
 * 保持登录状态
 */
exports.keepLogin = async (ctx, next) => {
    if (ctx.session.isNew) {
        if (ctx.cookies.get("username")) {
            ctx.session = {
                username: ctx.cookies.get('username'),
                uid: ctx.cookies.get('uid'),
                role: ctx.cookies.get('role')
            }
        }
    }
    await next()
}

/**
 * 退出登录
 */
exports.logout = async (ctx) => {
    ctx.session = null;
    ctx.cookies.set("username", null, {
        maxAge: 0
    })
    ctx.cookies.set("uid", null, {
        maxAge: 0
    })
    ctx.cookies.set("role", null, {
        maxAge: 0
    })
    ctx.body = {
        status: 1
    }
}