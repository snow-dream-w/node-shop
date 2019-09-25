const GoodsDao = require('../Dao/GoodsDao')
const goodsDao = new GoodsDao()
const GoodsService = require('../Service/GoodsService')
const goodsService = new GoodsService(goodsDao)

/**
 * 商品上架
 */
exports.addGoodsInfo = async (ctx) => {
    //接收参数
    const goods = ctx.request.body

    //session不存在
    if (ctx.session.isNew) {
        return ctx.body = {
            status: 0,
            msg: "未登录"
        }
    }
    //发起保存请求
    await new Promise(async (resolve) => {
        let result = await goodsService.addGoodsInfo(goods)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
/**
 * 修改商品信息
 */
exports.updateGoodsInfo = async (ctx) => {
    //接收参数
    const goods = ctx.request.body
    const goodsId = goods._id

    //session不存在
    if (ctx.session.isNew) {
        return ctx.body = {
            status: 0,
            msg: "未登录"
        }
    }
    //发起保存请求
    await new Promise(async (resolve) => {
        let result = await goodsService.updateGoodsInfo(goodsId, goods)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
/**
 * 获取商品信息
 */
exports.getGoodsInfo = async (ctx) => {

    //session不存在
    if (ctx.session.isNew) {
        return ctx.body = {
            status: 0,
            msg: "未登录"
        }
    }

    await new Promise(async (resolve) => {
        let result = await goodsService.getGoodsInfo()
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })


}