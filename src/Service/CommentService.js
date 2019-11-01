module.exports = class CommentService {
    /**
     * 
     * @param {*commentDao实例} commentDao 
     */
    constructor(commentDao) {
        this.commentDao = commentDao;
    }
    /**
     * @param {*评论包括以下内容：content评论内容,againstContent追评内容
     * grade分数,niceNum点赞数,userId用户id,goodsId商品id} comment 
     */
    async addCommentInfo(comment) {
        return await this.commentDao.addCommentInfo(comment)
    }
    /**
     * 
     * @param {*评论包括以下内容：content评论内容,againstContent追评内容
     * grade分数,niceNum点赞数,userId用户id,goodsId商品id} appendComment 
     */
    async appendCommentInfo(appendComment) {
        return await this.commentDao.appendCommentInfo(appendComment)
    }
    /**
     * 点赞
     * @param {评论id} commentId 
     */
    async clickNice(commentId){
       return await this.commentDao.clickNice(commentId)
    }
    /**
     * 获取评论列表
     * @param {*获取评论数量} limit 
     */
    async getCommentInfo(limit){
        return await this.commentDao.getCommentInfo(limit)
    }
    /**
     * 删除评论
     * @param {*评论id} commentId 
     */
    async deleteCommentInfo(commentId){
        return await this.commentDao.deleteCommentInfo(commentId)
    }
}