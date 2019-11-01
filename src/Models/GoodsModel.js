const {db} = require('../Utils/connect');
const GoodsSchema = require('../Schema/GoodsSchema');

//通过db创建操作goods数据库的模型对象
const Goods = db.model('goods',GoodsSchema)

module.exports = Goods