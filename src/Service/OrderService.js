module.exports = class OrderService {
    /**
    * 构造函数
    * @param {*OrderDao实例} orderDao 
    */
    constructor(orderDao) {
        this.orderDao = orderDao;
    }
    /**
     * 
     * @param {*} orderStatus 
     */
    async queryOrderByStatus(orderStatus) {
        return await this.orderDao.queryOrderByStatus(orderStatus)
    }
}