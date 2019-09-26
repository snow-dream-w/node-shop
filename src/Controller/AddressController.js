const AddressDao = require('../Dao/AddressDao')
const addressDao = new AddressDao
const AddressService = require('../Service/AddressService')
const addressService = new AddressService(addressDao)

/**
 * 添加收货地址
 */
exports.addReceivingAddress = async (ctx) => {
    let _id = ctx.session.id
    let addressInfo = ctx.request.body
    addressInfo['userId'] = _id
    await new Promise((resolve) => {
        let result = addressService.addReceivingAddress(addressInfo)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 获取收货地址
 */
exports.getReceivingAddress = async (ctx) => {
    let limit = new Number(ctx.params.limit)
    await new Promise(resolve => {
        let result = addressService.getReceivingAddress(limit)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 获取地址详情
 */
exports.getAddressDetail = async (ctx) => {
    let addressId = ctx.params.id
    await new Promise(resolve => {
        let result = addressService.getAddressDetail(addressId)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 更新收货地址
 */
exports.editAddressInfo = async (ctx) => {
    let addressInfo = ctx.request.body
    await new Promise((resolve) => {
        let result = addressService.editAddressInfo(addressInfo)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 删除收货地址
 */
exports.delReceivingAddress = async (ctx) => {
    let addressId = ctx.params.id
    await new Promise(resolve => {
        let result = addressService.delReceivingAddress(addressId)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
/**
 * 设置默认收货地址
 */
exports.defaultReceivingAddress = async (ctx) => {
    let addressId = ctx.request.body._id
    let userId = ctx.session.id
    await new Promise(resolve => {
        let result = addressService.defaultReceivingAddress(userId, addressId)
        resolve(result)
    }).then(data => {
        ctx.body = data
    })
}
