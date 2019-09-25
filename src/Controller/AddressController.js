const AddressDao = require('../Dao/AddressDao')
const addressDao = new AddressDao
const AddressService = require('../Service/AddressService')
const addressService = new AddressService(addressDao)

exports.addReceivingAddress = async (ctx) => {
    if(ctx.session.isNew){
        return ctx.body = {
            status: 0,
            data: '未登录'
        }
    }
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