const Order = require('../Models/OrderModel');
const { REQUEST_RESULT,ORDER_STATUS } = require('../Utils/status_enum')

module.exports = class OrderDao {
    /**
     * 创建订单
     * @param {*订单信息，包括用户ID userId,收货人姓名name，联系方式telephone，
     * 邮编post和收货地址address（area、details）} orderInfo 
     */
    async setOrderInfo(orderInfo) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: {}
        }
        return new Promise(resolve => {
            new Order(orderInfo).save((err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.status = REQUEST_RESULT.SUCCESS
                    result.data = data
                }
                resolve(result)
            })
        })
    }
    /**
     * 查看订单详情
     * @param {*订单编号} orderId 
     */
    async queryOrderDetails(orderId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: {}
        }
        await Order.findById(orderId, { _id: 0, total: 1 })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 查看订单列表
     * @param {*用户id} userId
     * @param {*订单状态} orderStatus 
     */
    async queryOrderByStatus(userId, orderStatus) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: {}
        }
        await Order.find({ userId: userId, status: orderStatus })
            .then(data => {
                if (data) {
                    result.status = REQUEST_RESULT.SUCCESS
                    result.data = data
                } else {
                    result.data = "未查询到信息"
                }
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 取消订单
     * @param {*用户id} userId 
     * @param {*订单id} orderId 
     */
    async cancelOrderInfo(userId, orderId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: "取消失败"
        }
        await Order.updateOne({ _id: orderId, userId: userId }, { $set: { status: ORDER_STATUS.CANCEL } })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 删除已取消的订单
     * @param {*订单id } orderId 
     * @param {*订单状态} status 
     */
    async deleteOrderInfo(orderId, status) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: "删除失败"
        }
        await Order.findOne({ _id: orderId, status: status })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
                data.remove()
            })
            .catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 更新订单状态
     * @param {*订单id } orderId 
     * @param {*订单状态} status 
     */
    async updateOrderStatus(orderId, status) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: "删除失败"
        }
        await Order.updateOne({ _id: orderId }, { $set: { status: status } })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            })
            .catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 查询已生成未支付的订单以及已结算未发货的订单
     */
    async queryPaymentedOreder(){
        let result = {
            status : REQUEST_RESULT.FAIL,
            data : {}
        }
        await Order.find({$or:[{status:ORDER_STATUS.ESTABLISH},{status:ORDER_STATUS.SETTLE}]})
        .then(data =>{
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
        }).catch(err =>{
            result.data = err
        })
        return result
    }
}