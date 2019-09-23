const User = require('../Models/UserModel');
const encrypt = require("../Utils/encrypt")

module.exports = class UserDao {
    /**
     * 登录
     * @param {*注册手机号} userId 
     * @param {*用户密码} password 
     */
    async loginAccount(userId, password) {
        let result = {
            status: 0,
            data: "请重新尝试"
        }
        await User.find({ telephone: userId }, (err, data) => {
            if (err) {
                result.data = err
            } else {
                if (data.length !== 0) {
                    if (data[0].password === encrypt(password)) {
                        result.status = 1
                        result.data = data[0]
                    } else {
                        result.data = "密码错误"
                    }
                } else {
                    result.data = "账号不存在"
                }
            }
        })
        return result
    }
    /**
     * 注册
     * @param {*用户信息对象} user 
     */
    async registerAccount(user) {
        let result = {
            status: 0,
            data: null
        }
        return new Promise(resolve => {
            new User(user).save((err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.status = 1
                    result.data = data
                }
                resolve(result)
            })
        })
    }
    /**
     * 判断用户名是否存在
     * @param {*用户注册手机号} userId 
     */
    async isExistAccount(userId) {
        let result = {
            status: 0,
            data: null
        }
        await User.find({ telephone: userId }, async (err, data) => {
            if (err) {
                result.data = err
            } else {
                if (data.length !== 0) {
                    result.data = "用户名已存在"
                } else {
                    result.status = 1
                }
            }
        })
        return result
    }
}