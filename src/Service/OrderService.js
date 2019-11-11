const { REQUEST_RESULT,ORDER_STATUS,DISCOUNT_STATUS,WEIGHT,SIGN } = require('../Utils/status_enum')

module.exports = class OrderService {
    /**
    * 构造函数
    * @param {*OrderDao实例} orderDao 
    * @param {*GoodsDao实例} goodsDao 
    * @param {*AddressDao实例} addressDao
    * @param {*CarDao实例} carDao
    * @param {*UserDao实例} userDao
    * @param {*RecommendDao实例} recommendDao
    */
    constructor(orderDao, goodsDao, addressDao, carDao, userDao, recommendDao) {
        this.orderDao = orderDao;
        this.goodsDao = goodsDao;
        this.addressDao = addressDao;
        this.carDao = carDao;
        this.userDao = userDao;
        this.recommendDao = recommendDao;
    }
    /**
     * 创建订单
     * @param {*对象数组，包括收货地址编号addressId，商品信息（购物车编号cars，商品编号goodsId和购买数量num）} params
     * @param {*用户ID} userId 
     */
    async setOrderInfo(params, userId) {
        let array = params.array
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        let total = 0;
        //结算总额和判断库存
        for (let index = 0; index < array.length; index++) {
            let goodsInfo = await this.goodsDao.getGoodsDetail(array[index].goodsId)
            if (goodsInfo.data.inventoryNum < new Number(array[index].num)) {
                result.data = goodsInfo.data.name + "-库存不足！目前库存为" + goodsInfo.data.inventoryNum
                return result
            }
            if (goodsInfo.data.discount.status === DISCOUNT_STATUS.ALLOWED) {
                total += goodsInfo.data.price * goodsInfo.data.discount.percent * new Number(array[index].num)
            } else {
                total += goodsInfo.data.price * new Number(array[index].num)
            }
        }
        //获取收货地址
        let address = await this.addressDao.getAddressDetail(params.addressId)
        //创建订单对象
        let orderInfo = {
            userId: userId,
            name: address.data.name,
            telephone: address.data.telephone,
            post: address.data.post,
            address: {
                area: address.data.address.area,
                details: address.data.address.details
            },
            total: total
        }
        //写入订单
        result = await this.orderDao.setOrderInfo(orderInfo)
        if (result.status === REQUEST_RESULT.SUCCESS) {
            //更新购物车商品状态
            for (let index = 0; index < array.length; index++) {
                let { goodsId } = await this.carDao.updateCarInfo(array[index]._id, 2, result.data._id)
                //更新用户-商品倒查表
                this.recommendDao.saveUserGoods(userId, goodsId, WEIGHT.SET_ORDER)
                //更新商品-用户倒查表
                this.recommendDao.saveGoodsUser(userId, goodsId, WEIGHT.SET_ORDER)
            }
            //更新用户购物车商品数量busNum
            await this.userDao.updateBusNum(userId, -array.length)
        }
        return result
    }
    /**
     * 订单结算
     * @param {*用户编号} userId 
     * @param {*订单编号} orderId 
     */
    async settleAccountOrder(userId, orderId) {
        //获取购物车商品
        let result = await this.carDao.getOrderGoods(orderId)
        const goodsList = result.data
        if (result.status === REQUEST_RESULT.FAIL) {
            return result
        }
        //判断库存
        for (let index = 0; index < goodsList.length; index++) {
            const element = goodsList[index];
            if (element.num > element.goodsId.inventoryNum) {
                return {
                    status: REQUEST_RESULT.FAIL,
                    data: `${element.goodsId.name}:库存不足，当前库存为：${element.goodsId.inventoryNum}`
                }
            }
        }
        //修改库存和销量
        await this.updateInventorySales(goodsList, SIGN.POSITIVE)
        //判断用户余额是否充足
        const userInfo = await this.userDao.getUserInfo(userId)
        const orderInfo = await this.orderDao.queryOrderDetails(orderId)
        if (userInfo.data.money < orderInfo.data.total) {
            //恢复库存和销量
            await this.updateInventorySales(goodsList, SIGN.NEGATIVE)
            return {
                status: REQUEST_RESULT.FAIL,
                data: "余额不足，请充值"
            }
        }
        //更新用户余额
        result = await this.userDao.updateUserMoney(userId, orderInfo.data.total)
        if (result.status === REQUEST_RESULT.FAIL) {
            //恢复库存和销量
            await this.updateInventorySales(goodsList, SIGN.NEGATIVE)
            return {
                status: REQUEST_RESULT.FAIL,
                data: "支付失败"
            }
        }
        //更新订单状态,2为已结算
        result = await this.orderDao.updateOrderStatus(orderId, ORDER_STATUS.SETTLE)
        if (result.status === REQUEST_RESULT.FAIL) {
            //恢复库存和销量和用户余额
            await this.updateInventorySales(goodsList, SIGN.NEGATIVE)
            await this.userDao.updateUserMoney(userId, -orderInfo.data.total)
            return {
                status: REQUEST_RESULT.FAIL,
                data: "支付订单失败"
            }
        }
        //更新倒查表
        for (let index = 0; index < goodsList.length; index++) {
            const element = goodsList[index];
            //更新用户-商品倒查表
            this.recommendDao.saveUserGoods(userId, element.goodsId._id, WEIGHT.ORDER_SETTLE)
            //更新商品-用户倒查表
            this.recommendDao.saveGoodsUser(userId, element.goodsId._id, WEIGHT.ORDER_SETTLE)
        }
        //更新商品-用户倒查表
        return {
            status: REQUEST_RESULT.SUCCESS,
            data: "支付成功"
        }
    }
    /**
     * 更新库存和销量的工具函数
     * @param {*购物车商品信息} array 
     * @param {*判断正负} sign 
     */
    async updateInventorySales(array, sign) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            await this.goodsDao.updateInventorySales(element.goodsId._id, element.num * sign)
        }
    }
    /**
     * 查看订单列表
     * @param {*用户id} userId 
     * @param {*订单状态} orderStatus 
     */
    async queryOrderByStatus(userId, orderStatus) {
        return await this.orderDao.queryOrderByStatus(userId, orderStatus)
    }
    /**
     * 取消订单
     * @param {*用户id} userId
     * @param {*订单id} orderId 
     */
    async cancelOrderInfo(userId, orderId) {
        return await this.orderDao.cancelOrderInfo(userId, orderId)
    }
    /**
     * 删除已取消的订单
     * @param {*订单id } orderId 
     * @param {*订单状态} status 
     */
    async deleteOrderInfo(orderId) {
        return await this.orderDao.deleteOrderInfo(orderId, ORDER_STATUS.CANCEL)
    }
}