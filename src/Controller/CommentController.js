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
/**
 * 追评
 */
exports.appendCommentInfo = async (ctx) => {
    //接收参数
    const userId = ctx.session.id
    const appendComment = ctx.request.body

    appendComment['usedId'] = userId

    await new Promise (async (resolve) =>{
        let result = await commentService.appendCommentInfo(appendComment)
        return resolve(result)
    }).then(result =>{
        ctx.body = result
    })
}
/**
 * 点赞
 */
exports.clickNice = async(ctx) =>{
    //接受参数
    const comment = ctx.request.body
    const commentId = comment._id

    await new Promise (async (resolve) =>{
        let result = await commentService.clickNice(commentId)
        return resolve(result)
    }).then(result =>{
        ctx.body = result
    })
}
/**
 * 获取评论列表
 */
exports.getCommentInfo = async (ctx) =>{
    let limit = new Number(ctx.params.limit)

    await new Promise(async (resolve) =>{
        let result = await commentService.getCommentInfo(limit)
        return resolve(result)
    }).then(result =>{
        ctx.body = result
    })
}
/**
 * 删除评论
 */
exports.deleteCommentInfo = async (ctx) =>{
    const commentId = ctx.params.id

    await new Promise(async (resolve) =>{
        let result = await commentService.deleteCommentInfo(commentId)
        return resolve(result)
    }).then(data =>{
        ctx.body = data
    })
}