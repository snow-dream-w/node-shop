const Comment = require('../Models/CommentModel');

module.exports = class CommentDao {
    /**
     * 评论商品
     * @param {*评论} comment 包括以下内容
     * {*评论内容} content 
     * {*追评内容} againstContent 
     * {*分数} grade
     * {*点赞数} niceNum
     * {*用户id} userId
     * {*商品id} goodsId
     */
    async addCommentInfo(comment){
        let result = {
            status: 0,
            data: null
        }
        return new Promise(resolve => {
            new Comment(comment).save((err,data)=>{
                if (err) {
                    result.data = err
                } else {
                    result.status = 1
                    result.data = data
                }
                resolve(result)   
            })
        })
    }
}