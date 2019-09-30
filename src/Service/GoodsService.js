module.exports = class GoodsService {
    /**
     * 构造函数
     * @param {*GoodsDao实例} goodsDao 
     * @param {*CarsDao实例} carDao 
     * @param {*OrderDao实例} orderDao 
     */
    constructor(goodsDao, carDao, orderDao) {
        this.goodsDao = goodsDao;
        this.carDao = carDao;
        this.orderDao = orderDao;
    }

    /**
     * 商品上架
     * @param {*商品信息对象} goods包括以下内容
     * {*商品姓名} name
     * {*商品描述} description
     * {*商品图像} images
     * {*一级分类} types
     * {*二级分类} type
     * {*单价} price
     * {*规格} specification
     * {*销量} sales
     * {*单位} unit
     * {*折扣} discount
     * {*折扣状态} status
     * {*折扣比例} percent
     * {*库存} inventoryNum
     * {*评论数量} commentNum
     * {*状态} status
     */
    async addGoodsInfo(goods) {
        let result = {}
        result = await this.goodsDao.isGoodExists(goods.name)
        if (result.status === 1) {
            result = await this.goodsDao.addGoodsInfo(goods)
        }
        return result
    }
    /**
     * 修改商品信息
     * @param {*商品id} goodsId 
     * @param {*商品信息对象} goods 
     */
    async updateGoodsInfo(goodsId, goods) {
        let result = {}
        result = await this.goodsDao.isGoodExists(goods.name)
        if (result.status === 1) {
            result = await this.goodsDao.updateGoodsInfo(goodsId, goods)
        }
        return result
    }
    /**
     * 获取商品信息列表
     * @param {*获取商品数量} limit 
     */
    async getGoodsInfo(limit) {
        return await this.goodsDao.getGoodsInfo(limit)
    }
    /**
     * 商品下架
     * @param {*商品id} goodsId 
     */
    async shelfGoodsInfo(goodsId, status) {
        let result = await this.orderDao.queryPaymentedOreder()
        if (result.status === 0) {
            return {
                status: 0,
                data: "404"
            }
        }
        for (let i = 0; i < result.data.length; i++) {
            const orderId = result.data[i]._id;
            const goods = await this.carDao.queryPaymentedGoods(orderId)
            for (let i = 0; i < goods.data.length; i++) {
                if (goods.data[i].goodsId.toString() === goodsId)
                    return {
                        status: 0,
                        data: "该商品存在相关的未完成的订单！"
                    }
            }
        }
        return await this.goodsDao.shelfGoodsInfo(goodsId, status)
    }
    /**
     * 获取商品详情
     * @param {*商品id} goodsId 
     */
    async getGoodsDetail(goodsId) {
        return await this.goodsDao.getGoodsDetail(goodsId)
    }
    /**
     * 删除已下架商品
     * @param {*商品id} goodsId 
     */
    async deleteGoodsInfo(goodsId ){
        return await this.goodsDao.shelfGoodsInfo(goodsId,2)
    }
}