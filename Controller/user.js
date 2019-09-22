const User = require('../Models/user');
const encrypt = require("../utils/encrypt")

//用户注册
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
    await new Promise((resolve, reject) => {
        User.find({ telephone: user.telephone }, (err, data) => {
            if (err) {
                return reject(err)
            } else {
                if (data.length !== 0) {
                    return reject("用户名已存在")
                }
                new User(user).save((err, data) => {
                    if (err) {
                        return reject(err)
                    } else {
                        resolve(data)
                    }
                })
            }
        })
    }).then(data => {
        ctx.body = data
    }).catch(err => {
        ctx.body = err
    })
}

//用户登录
exports.login = async (ctx) => {
    //取参数
    const user = ctx.request.body
    const userId = user.telephone
    const password = user.password
    //查找数据
    await new Promise((resolve, reject) => {
        User.findOne({ telephone: userId }, (err, data) => {
            if (err) {
                return reject(err)
            } else {
                if (data.telephone) {
                    if (data.password === encrypt(password)) {
                        return resolve(data)
                    } else {
                        return reject("密码错误")
                    }
                } else {
                    return reject("账号不存在")
                }
            }
        })
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

//保持登录状态
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

//退出登录
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