const {db} = require('../Utils/connect');
const User_Goods = require('../Schema/User_Goods');

//通过db创建操作goods_user数据库的模型对象
const UserGoods = db.model('user_goods',User_Goods)

module.exports = UserGoods