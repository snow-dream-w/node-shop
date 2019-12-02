const { REQUEST_RESULT,GOODS_STATUS } = require('../Utils/status_enum')
module.exports = class GoodsService {
    /**
     * 构造函数
     * @param {*GoodsDao实例} goodsDao 
     * @param {*CarsDao实例} carDao 
     * @param {*OrderDao实例} orderDao 
     * @param {*RecommendDao} recommendDao 
     */
    constructor(goodsDao, carDao, orderDao, recommendDao) {
        this.goodsDao = goodsDao;
        this.carDao = carDao;
        this.orderDao = orderDao;
        this.recommendDao = recommendDao;
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
        if (result.status === REQUEST_RESULT.SUCCESS) {
            result = await this.goodsDao.addGoodsInfo(goods)
        }
        return result
    }
    /**
     * 更新商品图片
     * @param {*商品编号} goodsId 
     * @param {*图片名称} filename 
     */
    async updateGoodsImage(goodsId,filename){
        return await this.goodsDao.updateGoodsImage(goodsId,filename)
    }
    /**
     * 修改商品信息
     * @param {*商品id} goodsId 
     * @param {*商品信息对象} goods 
     */
    async updateGoodsInfo(goodsId, goods) {
        let result = {}
        result = await this.goodsDao.isGoodExists(goods.name)
        if (result.status === REQUEST_RESULT.SUCCESS) {
            result = await this.goodsDao.updateGoodsInfo(goodsId, goods)
        }
        return result
    }
    /**
     * 获取商品信息列表
     * @param {*获取商品数量} limit
     * @param {*商品一级类型} types
     * @param {*商品二级类型} type
     * @param {*商品状态} status
     */
    async getGoodsInfo(params) {
        return await this.goodsDao.getGoodsInfo(params)
    }
    /**
     * 商品下架
     * @param {*商品id} goodsId 
     */
    async shelfGoodsInfo(goodsId) {
        let result = await this.orderDao.queryPaymentedOreder()
        if (result.status === REQUEST_RESULT.FAIL) {
            return {
                status: REQUEST_RESULT.FAIL,
                data: "404"
            }
        }
        for (let i = 0; i < result.data.length; i++) {
            const orderId = result.data[i]._id;
            const goods = await this.carDao.queryPaymentedGoods(orderId)
            for (let i = 0; i < goods.data.length; i++) {
                if (goods.data[i].goodsId.toString() === goodsId)
                    return {
                        status: REQUEST_RESULT.FAIL,
                        data: "该商品存在相关的未完成的订单！"
                    }
            }
        }
        return await this.goodsDao.shelfGoodsInfo(goodsId, GOODS_STATUS.UNDERCARRIAGE)
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
    async deleteGoodsInfo(goodsId){
        return await this.goodsDao.shelfGoodsInfo(goodsId,GOODS_STATUS.DELETE)
    }
    /**
     * 获取倒查表商品
     * @param {用户id} userId 
     */
    async getRecommendGoods_S(){
        return await this.recommendDao.getUserGoodsInfo()
    }
    /**
     * 获取下架商品
     * @param {商品状态} status 
     */
    async getShelfGoods(status){
        return await this.goodsDao.getShelfGoods(status)
    }
}