const Goods = require('../Models/GoodsModel');
const { REQUEST_RESULT,GOODS_STATUS } = require('../Utils/status_enum')

module.exports = class GoodsDao {
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
    async isGoodExists(goodsName) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: {}
        }
        await Goods.find({ name: goodsName }, (err, data) => {
            if (err) {
                result.data = err
            } else {
                if (data.length !== 0) {
                    result.data = "该商品名已存在"
                } else {
                    result.status = REQUEST_RESULT.SUCCESS
                }
            }
        })
        return result
    }
    /**
     * 商品上架
     * @param {*商品信息对象} goods 
     */
    async addGoodsInfo(goods) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        return new Promise(resolve => {
            new Goods(goods).save((err, data) => {
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
     * 更新商品图片
     * @param {*商品编号} goodsId 
     * @param {*图片名称} filename 
     */
    async updateGoodsImage(goodsId,filename){
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Goods.updateOne({ _id: goodsId }, { $push: {images: filename} }, { runValidators: true }).then(data => {
            result.status = REQUEST_RESULT.SUCCESS
            result.data = data
        }).catch(err => {
            result.data = err
        })
        return result
    }
    /**
     * 修改商品信息
     * @param {*商品id} goodsId 
     * @param {*商品信息对象} goods 
     */
    async updateGoodsInfo(goodsId, goods) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Goods.updateOne({ _id: goodsId }, { $set: goods }, { runValidators: true, new: true }).then(data => {
            result.status = REQUEST_RESULT.SUCCESS
            result.data = data
        }).catch(err => {
            result.data = err
        })
        return result
    }
    /**
     * 获取商品信息列表
     * @param {*获取商品数量} limit 
     */
    async getGoodsInfo(limit) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: {}
        }
        await Goods.find({ status: GOODS_STATUS.GROUNGING })
            .limit(limit)
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 修改商品集合里商品状态，已下架或已删除
     * @param {*商品id} goodsId 
     */
    async shelfGoodsInfo(goodsId,status) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: "下架失败"
        }
        await Goods.updateOne({ _id: goodsId }, { $set: { status: status } })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 获取商品详情
     * @param {*商品id} goodsId 
     */
    async getGoodsDetail(goodsId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: {}
        }
        await Goods.findOne({ _id: goodsId })
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
     * 更新商品库存和销量
     * @param {*商品编号} goodsId 
     * @param {*更新数量} num 
     */
    async updateInventorySales(goodsId, num) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Goods.updateOne({ _id: goodsId }, { $inc: { inventoryNum: -num, sales: num } })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
}

