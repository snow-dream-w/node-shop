module.exports = class UserService{
    /**
     * 构造函数
     * @param {*UserDao实例} userDao 
     */
    constructor(userDao){
        this.userDao = userDao;
    }
    /**
     * 登录
     * @param {*注册手机号} userId 
     * @param {*用户密码} password 
     */
    async loginAccount(userId, password) {
        let result = await this.userDao.loginAccount(userId, password)
        return result
    }
    /**
     * 注册
     * @param {*用户信息对象} user 
     */
    async registerAccount(user) {
        let result = {}
        result = await this.userDao.isExistAccount(user.telephone)
        if(result.status === 1){
            result = await this.userDao.registerAccount(user)
        }
        return result
    }
}