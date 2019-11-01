const Router = require('koa-router')

const answer = require('../Controller/AnswerController');
const user = require('../Controller/UserController')

const router = new Router

//回复评论
router.post("/answer/add",user.keepLogin,answer.addRespondInfo);

module.exports = router