const {db} = require('../Utils/connect');
const CommentSchema = require('../Schema/CommentSchema');

//通过db创建操作goods数据库的模型对象
const Commment = db.model('comments',CommentSchema)

module.exports = Commment