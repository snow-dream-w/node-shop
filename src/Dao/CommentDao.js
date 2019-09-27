const Comment = require('../Models/CommentModel');

module.exports = class CommentDao {
     /**
     * @param {*评论包括以下内容：content评论内容,againstContent追评内容
        * grade分数,niceNum点赞数,userId用户id,goodsId商品id} comment 
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
    /**
     * 
     * @param {*评论包括以下内容：content评论内容,againstContent追评内容
        * grade分数,niceNum点赞数,userId用户id,goodsId商品id} appendComment 
        */
    async appendCommentInfo(appendComment){
        let result = {
            status:0,
            data :null
        }
        await Comment.updateOne({_id:appendComment.commentId},
            {$set:{againstContent:appendComment.againstContent}},
            {runValidators: true, new: true}).then(data =>{
            result.status = 1
            result.data = data
        }).catch(err =>{
            result.data=err
        })
        return result
    }
    /**
     * 点赞
     * @param {评论id} commentId 
     */
    async clickNice(commentId){
        let result = {
            status:0,
            data:{}
        }
        await Comment.updateOne({_id:commentId},{$inc:{niceNum:1}})
        .then(data =>{
            result.status = 1
            result.data =data
        }).catch(err =>{
            result.data = err
        })
        return result
    }
    /**
     * 获取评论列表
     * @param {获取评论数量} limit 
     */
    async getCommentInfo(limit){
        let result = {
            status:0,
            data:{}
        }
        await Comment.find()
        .limit(limit)
        .then(data => {
            if (data.length !== 0) {
                result.status = 1
                result.data = data
            } else {
                result.data = "未查询到信息"
            }
        }).catch(err => {
            result.data = err
        })
    return result
    }
    
}