const OrderDao = require('../Dao/OrderDao')
const orderDao = new OrderDao()
const OrderService = require('../Service/OrderService')
const orderService = new OrderService(orderDao)

/**
 * 查看订单
 */
exports.queryOrderByStatus = async (ctx) =>{
    //接受参数
    const orderStatus = ctx.params.status;

    await new Promise(async (resolve) =>{
        let result = await orderService.queryOrderByStatus(orderStatus)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
exports.cancelOrderInfo = async (ctx) =>{
    //接受参数
    const orderId = ctx.params.id;

    await new Promise(async (resolve) =>{
        let result = await orderService.cancelOrderInfo(orderId)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
