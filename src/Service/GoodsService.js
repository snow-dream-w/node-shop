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
    * @param {*商品信息对象} goods：
    * name: String 商品姓名 
    *description: String 描述
    *images: []  商品图像
    *types: String  一级分类
    *type: String  二级分类
    *price: float  单价
    *specification: String 规格
    *sales: int  销量
    *unit: String  单位
    *discount：{
        *status: int 折扣状态
        *percent: float	 折扣比例
    }
    *inventoryNum: int 库存
    *commentNum: int 评论数量
    *status: int 状态
    *createdAt: String 创建时间
    *updatedAt: String 更新时间
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
     * 获取商品信息
     */
    async getGoodsInfo() {
        return await this.goodsDao.getGoodsInfo()
    }

}