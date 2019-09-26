module.exports = class CommentService{
/**
 * 
 * @param {*commentDao实例} commentDao 
 */
    constructor(commentDao) {
        this.commentDao = commentDao;
    }
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
        let result = {}
        result = await this.commentDao.addCommentInfo(comment)
        return result
    }
}