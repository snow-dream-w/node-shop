const Router = require('koa-router')

const order = require('../Controller/OrderController')
const user = require('../Controller/UserController')

const router = new Router

//创建订单
router.post("/order/set",user.keepLogin,order.setOrderInfo)

//订单结算
router.post("/order/account",user.keepLogin,order.settleAccountOrder)

//订单列表
router.get("/order/orderInfo/:status",user.keepLogin,order.queryOrderByStatus);

//取消订单
router.post("/order/cancel",user.keepLogin,order.cancelOrderInfo);

//删除订单
router.del("/order/delete/:id",user.keepLogin,order.deleteOrderInfo);

module.exports = router
