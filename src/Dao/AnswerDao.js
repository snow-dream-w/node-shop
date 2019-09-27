const Answer = require('../Models/AnswerModel');

module.exports = class AnswerDao {
    /**
     * 回复评论
     * @param {*回复评论信息包括content:回复内容,userId：评论人id,
     * commentId：评论id，selfId：用户id,niceNum：点赞数量} respond 
     */
    async addRespondInfo(respond) {
        let result = {
            status: 0,
            data: null
        }
        return new Promise(resolve => {
            new Answer(respond).save((err, data) => {
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