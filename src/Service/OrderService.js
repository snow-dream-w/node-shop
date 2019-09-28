module.exports = class OrderService {
    /**
    * 构造函数
    * @param {*OrderDao实例} orderDao 
    * @param {*GoodsDao实例} goodsDao 
    * @param {*AddressDao实例} addressDao
    * @param {*CarDao实例} carDao
    * @param {*UserDao实例} userDao
    */
    constructor(orderDao, goodsDao, addressDao, carDao, userDao) {
        this.orderDao = orderDao;
        this.goodsDao = goodsDao;
        this.addressDao = addressDao;
        this.carDao = carDao;
        this.userDao = userDao;
    }
    /**
     * 创建订单
     * @param {*对象数组，包括s收货地址编号addressId，商品信息（购物车编号cars，商品编号goodsId和购买数量num）} params
     * @param {*用户ID} userId 
     */
    async setOrderInfo(params,userId) {
        let array = params.array
        let result = {
            status: 0,
            data: null
        }
        let total = 0;
        //结算总额和判断库存
        for (let index = 0; index < array.length; index++) {
            let goodsInfo = await this.goodsDao.getGoodsDetail(array[index].goodsId)
            if(goodsInfo.data.inventoryNum < new Number(array[index].num)){
                result.data = goodsInfo.data.name + "-库存不足！目前库存为" + goodsInfo.data.inventoryNum
                return result
            }
            if (goodsInfo.data.discount.status === 1) {
                total += goodsInfo.data.price * goodsInfo.data.discount.percent * new Number(array[index].num)
            } else {
                total += goodsInfo.data.price * new Number(array[index].num)
            }
        }
        //获取收货地址
        let address = await this.addressDao.getAddressDetail(params.addressId)
        //创建订单对象
        let orderInfo = {
            userId:userId,
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
        if(result.status === 1){
            //更新购物车商品状态
            for (let index = 0; index < array.length; index++){
                await this.carDao.updateCarInfo(array[index]._id, 2, result.data._id)
            }
            //更新用户购物车商品数量busNum
            await this.userDao.updateBusNum(userId,-array.length)
        }
        return result
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
        return await this.orderDao.cancelOrderInfo(orderId)
    }
}