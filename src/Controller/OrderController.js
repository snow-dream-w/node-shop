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

     //session不存在
     if (ctx.session.isNew) {
        return ctx.body = {
            status: 0,
            msg: "未登录"
        }
    }
    await new Promise(async (resolve) =>{
        let result = await orderService.queryOrderByStatus(orderStatus)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}