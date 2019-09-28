const Order = require('../Models/OrderModel');

module.exports = class OrderDao {
    /**
     * 创建订单
     * @param {*订单信息，包括用户ID userId,收货人姓名name，联系方式telephone，
     * 邮编post和收货地址address（area、details）} orderInfo 
     */
    async setOrderInfo(orderInfo) {
        let result = {
            status: 0,
            data: {}
        }
        return new Promise(resolve => {
            new Order(orderInfo).save((err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.status = 1
                    result.data = data
                }
                resolve(result)
            })
        })
    }
    /**
     * 查看订单
     * @param {*订单状态} orderStatus 
     */async queryOrderByStatus(orderStatus) {
        let result = {
            status: 0,
            data: {}
        }
        await Order.find({ status: orderStatus })
            .then(data => {
                if (data) {
                    result.status = 1
                    result.data = data
                } else {
                    result.data = "未查询到信息"
                }
            }).catch(err => {
                result.data = err
            })
        return result
    }
    async cancelOrderInfo(orderId) {
        let result = {
            status: 0,
            data: "取消失败"
        }
        await Order.updateOne({ _id: orderId }, { $set: { status: 4 } })
            .then(data => {
                result.status = 1
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
}