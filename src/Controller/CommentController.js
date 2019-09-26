const CommentDao = require('../Dao/CommentDao')
const commentDao = new CommentDao()
const CommentService = require('../Service/CommentService')
const commentService = new CommentService(commentDao)

/**
 * 评论商品
 */
exports.addCommentInfo = async(ctx) =>{
    //接受参数
    const userId = ctx.session.id
    const comment = ctx.request.body

    comment['userId'] = userId

    await new Promise(async (resolve) => {
        let result = await commentService.addCommentInfo(comment);
        return resolve(result)
    }).then(result =>{
        ctx.body = result
    })

}