const User = require('../Models/UserModel');
const encrypt = require("../Utils/encrypt")

module.exports = class UserDao {
    async loginAccount(userId, password){
        let result = {
            status: 0,
            data: null
        }
        await User.findOne({ telephone: userId }, (err, data) => {
            if (err) {
                result.data = err
            } else {
                if (data.telephone) {
                    if (data.password === encrypt(password)) {
                        result.status = 1
                        result.data = data
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
}


//用户登录
// exports.loginAccount = async (userId, password) => {
//     let result = {
//         status: 0,
//         data: null
//     }
//     await User.findOne({ telephone: userId }, (err, data) => {
//         if (err) {
//             result.data = err
//         } else {
//             if (data.telephone) {
//                 if (data.password === encrypt(password)) {
//                     result.status = 1
//                     result.data = data
//                 } else {
//                     result.data = "密码错误"
//                 }
//             } else {
//                 result.data = "账号不存在"
//             }
//         }
//     })
//     return result
// }
