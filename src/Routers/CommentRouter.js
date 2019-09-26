const Router = require('koa-router')

const comment = require('../Controller/CommentController')
const user = require('../Controller/UserController')

const router = new Router

//评论
router.post("/comment/add",user.keepLogin,comment.addCommentInfo);

module.exports = router