const GoodsDao = require('../Dao/GoodsDao')
const goodsDao = new GoodsDao()
const OrderDao = require('../Dao/OrderDao')
const orderDao = new OrderDao()
const CarDao = require('../Dao/CarDao')
const carDao = new CarDao()
const GoodsService = require('../Service/GoodsService')
const goodsService = new GoodsService(goodsDao,carDao,orderDao)


/**
 * 商品上架
 */
exports.addGoodsInfo = async (ctx) => {
    //接收参数
    const goods = ctx.request.body

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

    //发起保存请求
    await new Promise(async (resolve) => {
        let result = await goodsService.updateGoodsInfo(goodsId, goods)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
/**
 * 获取商品信息列表
 */
exports.getGoodsInfo = async (ctx) => {
    let limit = new Number(ctx.params.limit)

    await new Promise(async (resolve) => {
        let result = await goodsService.getGoodsInfo(limit)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
/**
 * 商品下架
 */
exports.shelfGoodsInfo = async (ctx) =>{
    //接受参数
    const goods = ctx.request.body
    const goodsId = goods._id
    const status = goods.status

    await new Promise(async (resolve) => {
        let result = await goodsService.shelfGoodsInfo(goodsId,status)
        return resolve(result)
    }).then(result =>{
        ctx.body = result
    })
}
/**
 * 获取商品详情
 */
exports.getGoodsDetail = async (ctx) => {
    //接受参数
    const goodsId = ctx.params.id;

    await new Promise(async (resolve) => {
        let result = await goodsService.getGoodsDetail(goodsId)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}

exports.deleteGoodsInfo = async (ctx) =>{
    //接受参数
    const goods = ctx.request.body
    const goodsId = goods._id

    await new Promise(async (resolve) => {
        let result = await goodsService.deleteGoodsInfo(goodsId)
        return resolve(result)
    }).then(result =>{
        ctx.body = result
    })
}