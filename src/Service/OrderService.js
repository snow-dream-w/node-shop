module.exports = class OrderService {
    /**
    * 构造函数
    * @param {*OrderDao实例} orderDao 
    */
    constructor(orderDao) {
        this.orderDao = orderDao;
    }
    /**
     * 查看订单
     * @param {*订单状态} orderStatus 
     */
    async queryOrderByStatus(orderStatus) {
        return await this.orderDao.queryOrderByStatus(orderStatus)
    }
    /**
     * 取消订单
     * @param {*订单id} orderId 
     */
    async cancelOrderInfo(orderId) {
        return await this.orderDao.queryOrderByStatus(orderId)
    }
}