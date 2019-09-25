const Goods = require('../Models/GoodsModel');

 
 module.exports = class GoodsDao{
    /**
     * 判断商品名是否存在
     * @param {*商品名} goodsName 
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
            new Goods(goods).save((err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.status = 1
                    result.data = data
                }
                resolve(result)
            })
        })
    }
    /**
     * 修改商品信息
     * param {*商品信息对象} goods 
     */
    async updateGoodsInfo(goodsId,goods) {
        let result = {
            status: 0,
            data: null
        }
        await  Goods.updateOne( {_id:goodsId},{$set:goods},{ runValidators: true, new: true }, (err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.status = 1
                    result.data = data
                }
                // resolve(result)
            }).catch(err =>{
                console.log("数据不合法");
                
            })
            return result
        }
        /**
         * 获取用户信息
         */
        async getGoodsInfo(userId) {
            let result = {
                status: 0,
                data: {}
            }
            await Goods.find( (err, data) => {
                if (err) {
                    result.data = err
                } else {
                    if (data) {
                        result.status = 1
                        result.data = data
                    } else {
                        result.data = "未查询到信息，请重新尝试"
                    }
                }
            })
            return result
        }
    }
 
 