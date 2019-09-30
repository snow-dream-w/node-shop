const {db} = require('../Utils/connect');
const Goods_User = require('../Schema/Goods_User');

//通过db创建操作goods_user数据库的模型对象
const GoodsUser = db.model('goods_users',Goods_User)

module.exports = GoodsUser