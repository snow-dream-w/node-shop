module.exports = class GoodsService {
    /**
    * 构造函数
    * @param {*GoodsDao实例} goodsDao 
    */
    constructor(goodsDao) {
        this.goodsDao = goodsDao;
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
    async shelfGoodsInfo(goodsId) {
        let result = {}
        // result = await this.goodsDao.isOrderExists(goodsId)
        // if (result.status === 1) {
        //     result = await this.goodsDao.shelfGoodsInfo(goodsId)
        // }
        result = await this.goodsDao.shelfGoodsInfo(goodsId)
        return result
    }
    /**
     * 获取商品详情
     * @param {*商品id} goodsId 
     */
    async getGoodsDetail(goodsId) {
        return await this.goodsDao.getGoodsDetail(goodsId)
    }
}