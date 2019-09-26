const User = require('../Models/UserModel');
const encrypt = require("../Utils/encrypt")
const assert = require("assert")

module.exports = class UserDao {
    /**
     * 登录
     * @param {*注册手机号} userId 
     * @param {*用户密码} password 
     */
    async loginUserAccount(userId, password) {
        let result = {
            status: 0,
            data: "请重新尝试"
        }
        await User.find({ telephone: userId })
            .then(data => {
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
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 注册
     * @param {*用户信息对象} user 
     */
    async registerUserAccount(user) {
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
            data: {}
        }
        await User.find({ telephone: userId })
            .then(data => {
                if (data.length !== 0) {
                    result.data = "用户名已存在"
                } else {
                    result.status = 1
                }
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 获取用户信息
     * @param {*用户注册手机号} userId 
     */
    async getUserInfo(userId) {
        let result = {
            status: 0,
            data: {}
        }
        await User.findOne({ telephone: userId }, { _id: 0, password: 0, perference: 0 })
            .then(data => {
                if (data) {
                    result.status = 1
                    result.data = data
                } else {
                    result.data = "未查询到信息，请重新尝试"
                }
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 保存头像上传路径
     * @param {*用户注册手机号} userId
     * @param {*头像路径} avatarPath 
     */
    async uploadUserAvatar(userId, avatarPath) {
        let result = {
            status: 0,
            data: {}
        }
        await User.updateOne({ telephone: userId }, { '$set': { avatar: avatarPath } })
            .then(data => {
                result.status = 1
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 编辑个人基本信息
     * @param {*用户注册手机} userId 
     * @param {*待修改信息对象，包括性别sex和昵称name} info 
     */
    async editUserInfo(userId, info) {
        let result = {
            status: 0,
            data: {}
        }
        await User.findOneAndUpdate({ telephone: userId }, { $set: info }, { runValidators: true, new: true })
            .then(data => {
                result.status = 1
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 用户修改密码
     * @param {*用户注册手机号} userId 
     * @param {*新密码} newPassword 
     */
    async editUserPassword(userId, newPassword) {
        let result = {
            status: 0,
            data: {}
        }
        await User.updateOne({ telephone: userId }, { $set: { password: encrypt(newPassword) } })
            .then(data => {
                result.status = 1
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
}