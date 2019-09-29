const Router = require('koa-router')

const order = require('../Controller/OrderController')
const user = require('../Controller/UserController')

const router = new Router

//创建订单，没有获取相应的商品
router.post("/order/set",user.keepLogin,order.setOrderInfo)

//查看订单
router.get("/orders/orderInfo/:status",user.keepLogin,order.queryOrderByStatus);

//取消订单
router.post("/orders/cancel",user.keepLogin,order.cancelOrderInfo);

//删除订单
router.del("/orders/delete/:id",user.keepLogin,order.deleteOrderInfo);

module.exports = router
