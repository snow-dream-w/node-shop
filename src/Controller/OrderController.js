const OrderDao = require('../Dao/OrderDao')
const orderDao = new OrderDao()
const GoodsDao = require('../Dao/GoodsDao')
const goodsDao = new GoodsDao()
const AddressDao = require('../Dao/AddressDao')
const addressDao = new AddressDao()
const CarDao = require('../Dao/CarDao')
const carDao = new CarDao()
const UserDao = require('../Dao/UserDao')
const userDao = new UserDao()
const OrderService = require('../Service/OrderService')
const orderService = new OrderService(orderDao, goodsDao, addressDao, carDao, userDao)

/**
 * 创建订单
 */
exports.setOrderInfo = async (ctx) => {
    const params = ctx.request.body
    const userId = ctx.session.id
    await new Promise(resolve => {
        let result = orderService.setOrderInfo(params, userId)
        return resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 订单结算
 */
exports.settleAccountOrder = async (ctx) => {
    const orderId = ctx.request.body._id
    const userId = ctx.session.id
    await new Promise(resolve => {
        let result = orderService.settleAccountOrder(userId, orderId)
        return resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 查看订单
 */
exports.queryOrderByStatus = async (ctx) => {
    //接受参数
    const orderStatus = ctx.params.status;
    const userId = ctx.session.id;

    await new Promise(async (resolve) => {
        let result = await orderService.queryOrderByStatus(userId, orderStatus)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
/**
 * 取消订单
 */
exports.cancelOrderInfo = async (ctx) => {
    //接受参数
    const params = ctx.request.body;
    const userId = ctx.session.id;

    await new Promise(async (resolve) => {
        let result = await orderService.cancelOrderInfo(userId, params._id)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
/**
 * 删除已取消的订单
 */
exports.deleteOrderInfo = async (ctx) => {
    const orderId = ctx.params.id;
    await new Promise(async (resolve) => {
        let result = await orderService.deleteOrderInfo(orderId, 1)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
