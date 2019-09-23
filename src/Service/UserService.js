module.exports = class UserService{
    constructor(userDao){
        this.userDao = userDao;
    }
    async loginAccount(userId, password) {
        let result = await this.userDao.loginAccount(userId, password)
        return result
    }
}

// exports.loginAccount = async (userId, password) => {
//     let userDao = new UserDao()
//     let result = await userDao.loginAccount(userId, password)
//     return result
// }