const {db} = require('../Utils/connect');
const CarSchema = require('../Schema/CarSchema');

//通过db创建操作car数据库的模型对象
const Car = db.model('cars',CarSchema)

module.exports = Car