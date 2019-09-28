const Router = require('koa-router')

const order = require('../Controller/OrderController')
const user = require('../Controller/UserController')

const router = new Router

//创建订单，没有获取相应的商品
router.post("/order/set",user.keepLogin,order.setOrderInfo)

//订单详情
router.get("/orders/orderInfo/:status",user.keepLogin,order.queryOrderByStatus);

//取消订单
router.post("/orders/cancel",user.keepLogin,order.cancelOrderInfo);

module.exports = router
