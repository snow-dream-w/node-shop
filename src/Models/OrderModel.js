const {db} = require('../Utils/connect');
const OrderSchema = require('../Schema/OrderSchema');

//通过db创建操作goods数据库的模型对象
const Order = db.model('orders',OrderSchema)

module.exports = Order 