const url = require('url')
const GoodsDao = require('../Dao/GoodsDao')
const goodsDao = new GoodsDao()
const OrderDao = require('../Dao/OrderDao')
const orderDao = new OrderDao()
const CarDao = require('../Dao/CarDao')
const carDao = new CarDao()
const RecommendDao = require('../Dao/RecommendDao')
const recommendDao = new RecommendDao()
const GoodsService = require('../Service/GoodsService')
const goodsService = new GoodsService(goodsDao,carDao,orderDao,recommendDao)
const RecommendService = require('../Service/RecommendService')

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
 * 更新商品图片
 */
exports.updateGoodsImage = async (ctx) => {
    const goodsId = ctx.request.body.goodsId
    const filename = '/goods_image/' + ctx.req.file.filename
    await new Promise(async (resolve) => {
        let result = await goodsService.updateGoodsImage(goodsId,filename)
        if(result.status === 1){
            result.data = filename
        }
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
    const params = url.parse(ctx.request.url, true).query;
    for(let key in params){
        if(!params[key]){
            delete params[key]
        }
    }
    const limit = params.limit;
    const skip = params.skip;
    const status = params.status;
    params.limit = Number.parseInt(limit);
    params.skip = Number.parseInt(skip);
    params.status = Number.parseInt(status);
    await new Promise(async (resolve) => {
        let result = await goodsService.getGoodsInfo(params)
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

    await new Promise(async (resolve) => {
        let result = await goodsService.shelfGoodsInfo(goodsId)
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
/**
 * 删除商品
 */
exports.deleteGoodsInfo = async (ctx) => {
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
/**
 * 获取下架商品
 */
exports.getShelfGoods = async (ctx) => {
    //接受参数
    const status = ctx.params.status;
    await new Promise(async (resolve) => {
        let result = await goodsService.getShelfGoods(status)
        return resolve(result)
    }).then(result => {
        ctx.body = result
    })
}
/**
 * 获取推荐商品
 */
exports.getRecommendGoods = async (ctx) => {
    const userId = ctx.session.id
    await new Promise(async (resolve) => {
        let data = await goodsService.getRecommendGoods_S()
        // 转化数据格式
        data = JSON.parse(JSON.stringify(data))
        const recommendService = new RecommendService(data, userId, 2)
        const arrayGoods = recommendService.start()
        console.log(arrayGoods)
        let result = []
        for(let goodsId of arrayGoods.values()){
            let goodsInfo = await goodsService.getGoodsDetail(goodsId)
            result.push(goodsInfo.data)
        }
        return resolve(result)
    }).then(result => {
        ctx.body = {
            status: 1,
            data: result
        }
    })
}