const CarDao = require('../Dao/CarDao')
const carDao = new CarDao()
const RecommendDao = require('../Dao/RecommendDao')
const recommendDao = new RecommendDao()
const CarService = require('../Service/CarService')
const carService = new CarService(carDao, recommendDao)

/**
 * 添加购物车商品信息
 */
exports.addCarInfo = async ctx => {
    let carInfo = ctx.request.body
    let id = ctx.session.id
    carInfo['userId'] = id
    await new Promise(resolve => {
        let result = carService.addCarInfo(carInfo)
        return resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 获取购物车信息
 */
exports.getCarInfo = async ctx => {
    let userId = ctx.session.id
    await new Promise(resolve => {
        let result = carService.getCarInfo(userId)
        return resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 删除购物车信息
 */
exports.deleteCarInfo = async ctx => {
    let carId = ctx.params.id
    await new Promise(resolve => {
        let result = carService.deleteCarInfo(carId)
        return resolve(result)
    }).then(data => {
        ctx.body = data
    })
}