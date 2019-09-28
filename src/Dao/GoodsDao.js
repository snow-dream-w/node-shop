const Goods = require('../Models/GoodsModel');
const Cars = require('../Models/CarModel');

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
            status: 0,
            data: {}
        }
        await Goods.find({ name: goodsName }, (err, data) => {
            if (err) {
                result.data = err
            } else {
                if (data.length !== 0) {
                    result.data = "该商品名已存在"
                } else {
                    result.status = 1
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
            status: 0,
            data: null
        }
        return new Promise(resolve => {
            new Goods(goods).save((err,data) => {
                if(err){
                    result.data = err
                }else {
                    result.status = 1
                    result.data = data
                }
                 resolve(result)
            }) 
        })
    }
  /**
   * 修改商品信息
   * @param {*商品id} goodsId 
   * @param {*商品信息对象} goods 
   */  
  async updateGoodsInfo(goodsId, goods) {
        let result = {
            status: 0,
            data: null
        }
        await Goods.updateOne({ _id: goodsId }, { $set: goods }, { runValidators: true, new: true }).then(data => {
            result.status = 1
            result.data = data
        }).catch(err => {
            console.log("数据不合法");
        })
        return result
    }
    /**
     * 获取商品信息列表
     * @param {*获取商品数量} limit 
     */
    async getGoodsInfo(limit) {
        let result = {
            status: 0,
            data: {}
        }
        await Goods.find()
            .limit(limit)
            .then(data => {
                if (data.length !== 0) {
                    result.status = 1
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
     * 商品下架,修改商品集合里商品状态
     * @param {*商品id} goodsId 
     */
    async shelfGoodsInfo(goodsId) {
        let result = {
            status: 0,
            data: "下架失败"
        }
        await Goods.updateOne({ _id: goodsId }, { $set: { status: 0 } })
            .then(data => {
                result.status = 1
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 商品下架，修改购物车里商品状态
     * @param {*商品id} goodsId 
     */
    async updateCarStatus(goodsId) {
        let result = {
            status: 0,
            data: "下架失败"
        }
        await Cars.update({ _id: goodsId }, { $set: { status: 0 } })
            .then(data => {
                result.status = 1
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
            status: 0,
            data: {}
        }
        await Goods.findOne({ _id: goodsId })
            .then(data => {
                if (data) {
                    result.status = 1
                    result.data = data
                } else {
                    result.data = "未查询到信息"
                }
            }).catch(err => {
                result.data = err
            })
        return result
    }
}

