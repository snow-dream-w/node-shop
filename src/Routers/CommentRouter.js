const Router = require('koa-router')

const comment = require('../Controller/CommentController')
const user = require('../Controller/UserController')

const router = new Router

//评论
router.post("/comment/add",user.keepLogin,comment.addCommentInfo);
//追评
router.post("/comment/append",user.keepLogin,comment.appendCommentInfo);
//点赞
router.post("/comment/nice",user.keepLogin,comment.clickNice);
//获取评论列表
router.get("/comment/query/:limit",user.keepLogin,comment.getCommentInfo);
//删除评论
router.del("/comment/delete/:id",user.keepLogin,comment.deleteCommentInfo);

module.exports = router