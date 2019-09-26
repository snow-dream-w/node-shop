const Order = require('../Models/OrderModel');

module.exports = class OrderDao{
    /**
     * 查看订单
     * @param {*订单状态} orderStatus 
     */async queryOrderByStatus(orderStatus){
        let result = {
            status: 0,
            data: {}
        }
        await Order.find({status:orderStatus})
        .then(data =>{
            if (data) {
                result.status = 1
                result.data = data
            } else {
                result.data = "未查询到信息"
            }
        }).catch(err =>{
            result.data = err
        })
        return result
    }
}