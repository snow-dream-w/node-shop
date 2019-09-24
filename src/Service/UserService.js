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
    async loginUserAccount(userId, password) {
        let result = await this.userDao.loginUserAccount(userId, password)
        return result
    }
    /**
     * 注册
     * @param {*用户信息对象} user 
     */
    async registerUserAccount(user) {
        let result = {}
        result = await this.userDao.isExistAccount(user.telephone)
        if(result.status === 1){
            result = await this.userDao.registerUserAccount(user)
        }
        return result
    }
    /**
     * 获取用户信息
     * @param {*用户注册手机号} userId 
     */
    async getUserInfo(userId){
        return this.userDao.getUserInfo(userId)
    }
    /**
     * 保存头像上传路径
     * @param {*用户注册手机号} userId
     * @param {*头像路径} avatarPath 
     */
    async uploadUserAvatar(userId,avatarPath){
        return this.userDao.uploadUserAvatar(userId,avatarPath)
    }
}