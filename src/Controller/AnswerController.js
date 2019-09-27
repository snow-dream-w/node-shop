const AnswerDao = require('../Dao/AnswerDao')
const answerDao = new AnswerDao()
const AnswerService = require('../Service/AnswerService')
const answerService = new AnswerService(answerDao)

/**
 * 回复评论
 */
exports.addRespondInfo = async (ctx) => {
    //接收参数
    const selfId = ctx.session.id
    const respond = ctx.request.body

    respond['selfId'] = selfId

    await new Promise (async (resolve) =>{
        let result = await answerService.addRespondInfo(respond)
        return resolve(result)
    }).then(result =>{
        ctx.body = result
    })
}