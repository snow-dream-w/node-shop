const {db} = require('../Utils/connect');
const AnswerSchema = require('../Schema/AnswerSchema');

//通过db创建操作goods数据库的模型对象
const Answer = db.model('answer',AnswerSchema)

module.exports = Answer