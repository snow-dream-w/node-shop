const {db} = require('../utils/connect');
const UserSchema = require('../Schema/user');

//通过db创建操作user数据库的模型对象
const User = db.model('users',UserSchema)

module.exports = User