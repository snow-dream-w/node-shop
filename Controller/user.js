const User = require('../Models/user');

exports.reg = async (ctx) => {
    //接收参数
    const user = ctx.request.body

    //填入部分默认值
    user['name'] = user.telephone
    user['money'] = 0
    user['busNum'] = 0
    
    //发起保存请求
    await new Promise((resolve,reject) => {
        User.find({telephone: user.telephone},(err,data) => {
            if(err){
                return reject(err)
            } else{
                if(data.length !==0){
                    return reject("用户名已存在")
                }
                new User(user).save((err,data) => {
                    if(err){
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