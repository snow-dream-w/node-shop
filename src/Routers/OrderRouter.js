const Router = require('koa-router')

const order = require('../Controller/OrderController')
const user = require('../Controller/UserController')

const router = new Router
//商品详情
router.get("/orders/orderInfo/:status",user.keepLogin,order.queryOrderByStatus);

module.exports = router
