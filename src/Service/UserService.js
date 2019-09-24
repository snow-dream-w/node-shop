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
        return await this.userDao.getUserInfo(userId)
    }
    /**
     * 保存头像上传路径
     * @param {*用户注册手机号} userId
     * @param {*头像路径} avatarPath 
     */
    async uploadUserAvatar(userId,avatarPath){
        return await this.userDao.uploadUserAvatar(userId,avatarPath)
    }
    /**
     * 编辑个人基本信息
     * @param {*用户注册手机} userId 
     * @param {*待修改信息对象，包括性别sex和昵称name} info 
     */
    async editUserInfo(userId,info){
        return await this.userDao.editUserInfo(userId,info)
    }
    /**
     * 修改用户密码
     * @param {*用户注册手机号} userId 
     * @param {*待修改信息对象，包括旧密码oldPassword和新密码newPassword} pwd
     */
    async editUserPassword(userId,pwd){
        let result = await this.userDao.loginUserAccount(userId,pwd.oldPassword)
        if(result.status === 1){
            return await this.userDao.editUserPassword(userId,pwd.newPassword)
        }
        return {
            status: 0,
            data: "原密码输入错误"
        }  
    }
}