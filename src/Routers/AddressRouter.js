const Router = require('koa-router')

const address = require('../Controller/AddressController')
const user = require('../Controller/UserController')

const router = new Router

//添加地址
router.post("/address/add",user.keepLogin,address.addReceivingAddress);

//查看收货地址
router.get("/address/get/:limit",user.keepLogin, address.getReceivingAddress);

//查看地址详情
router.get("/address/detail/:id",user.keepLogin, address.getAddressDetail);

//修改地址
router.post("/address/update",user.keepLogin, address.editAddressInfo);

//删除收货地址
router.del("/address/delete/:id",user.keepLogin, address.delReceivingAddress)

//默认收货地址
router.post("/address/default",user.keepLogin, address.defaultReceivingAddress)


module.exports = router