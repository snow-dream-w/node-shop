module.exports = class CommentService{
    /**
     * 
     * @param {*answerDao} answerDao 
     */
    constructor(answerDao) {
        this.answerDao = answerDao;
    }
    /**
     * 回复评论
     * @param {*回复评论信息包括content:回复内容,userId：评论人id,
     * commentId：评论id，selfId：用户id,niceNum：点赞数量} respond 
     */
    async addRespondInfo(respond){
        return await this.answerDao.addRespondInfo(respond)
    }
}