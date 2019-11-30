const UserDao = require('../Dao/UserDao')
const userDao = new UserDao()
const UserService = require('../Service/UserService')
const userService = new UserService(userDao)
const encrypt = require("../Utils/encrypt")
const { REQUEST_RESULT } = require('../Utils/status_enum')
/**
 * 用户注册
 */
exports.registerUserAccount = async (ctx) => {
    //接收参数
    const user = ctx.request.body

    //密码加密
    user.password = encrypt(user.password)

    //填入部分默认值
    user['name'] = user.telephone
    user['money'] = 0
    user['busNum'] = 0

    //发起保存请求
    await new Promise(function(resolve) {
        let result = userService.registerUserAccount(user)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}

/**
 * 用户登录
 */
exports.loginUserAccount = async (ctx) => {
    //取参数
    const user = ctx.request.body
    const userId = user.telephone
    const password = user.password
    //查找数据
    await new Promise(async (resolve, reject) => {
        let result = await userService.loginUserAccount(userId,password)
        if(result.status === REQUEST_RESULT.FAIL){
            reject(result.data)
        }
        resolve(result.data)
    }).then((data) => {
        //koa 2.x 不支持中文cookie
        //给客户端设置cookie
        ctx.cookies.set("_id", data._id, {
            domin: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: false, //true不让客户端访问这个cookie
            overwrite: false,
            // signed: false//默认是true
        });
        ctx.cookies.set("uid", data.telephone, {
            domin: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: false, //true不让客户端访问这个cookie
            overwrite: false,
            // signed: false//默认是true
        });
        ctx.cookies.set("username", Buffer.from(data.name).toString('base64'), {
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
        });
        ctx.cookies.set("avatar", data.avatar, {
            domin: "localhost",
            path: "/",
            maxAge: 36e5,
            httpOnly: false, //true不让客户端访问这个cookie
            overwrite: false,
            // signed: false//默认是true
        })
        //后台设置session
        ctx.session = {
            uid: data.telephone,
            role: data.role,
            id: data._id
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
 * 获取用户信息
 */
exports.getUserInfo = async (ctx) => {
    //获取参数
    const userId = ctx.session.id
    await new Promise((resolve) => {
        let result = userService.getUserInfo(userId)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}

/**
 * 上传头像
 */
exports.uploadUserAvatar = async (ctx) => {
    const userId = ctx.session.uid
    const avatarPath = '/avatar/' + ctx.req.file.filename
    ctx.cookies.set("avatar", avatarPath, {
        domin: "localhost",
        path: "/",
        maxAge: 36e5,
        httpOnly: false, //true不让客户端访问这个cookie
        overwrite: false,
        // signed: false//默认是true
    })
    await new Promise(resolve => {
        let result = userService.uploadUserAvatar(userId,avatarPath)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}

/**
 * 编辑用户信息
 */
exports.editUserInfo = async (ctx) => {
    const userId = ctx.session.uid
    //取出参数
    const info = ctx.request.body
    await new Promise(resolve => {
        let result = userService.editUserInfo(userId,info)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}

/**
 * 用户修改密码
 */
exports.editUserPassword = async (ctx) => {
    const userId = ctx.session.uid
    //取出参数
    const pwd = ctx.request.body
    await new Promise(resolve => {
        let result = userService.editUserPassword(userId,pwd)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}

/**
 * 保持登录状态
 */
exports.keepLogin = async (ctx, next) => {
    if (ctx.session.isNew) {
        if (ctx.cookies.get("username")) {
            ctx.session = {
                uid: ctx.cookies.get('uid'),
                role: ctx.cookies.get('role'),
                id: ctx.cookies.get('id')
            }
        } else{
            return ctx.body = {
                status: REQUEST_RESULT.FAIL,
                data: "未登录"
            }
        }
    }
    await next()
}

/**
 * 验证登录状态
 */
exports.checkLogin = async (ctx, next) => {
    if (ctx.session.isNew) {
        if (ctx.cookies.get("username")) {
            ctx.session = {
                uid: ctx.cookies.get('uid'),
                role: ctx.cookies.get('role'),
                id: ctx.cookies.get('id')
            }
        } else{
            return ctx.body = {
                status: REQUEST_RESULT.FAIL,
                data: "未登录"
            }
        }
    }
    ctx.body = {
        status: REQUEST_RESULT.SUCCESS,
        data: ctx.session.role
    }
}

/**
 * 退出登录
 */
exports.logout = async (ctx) => {
    ctx.session = null;
    ctx.cookies.set("_id", null, {
        maxAge: 0
    })
    ctx.cookies.set("username", null, {
        maxAge: 0
    })
    ctx.cookies.set("uid", null, {
        maxAge: 0
    })
    ctx.cookies.set("role", null, {
        maxAge: 0
    })
    ctx.cookies.set("avatar", null, {
        maxAge: 0
    })
    ctx.body = {
        status: 1
    }
}