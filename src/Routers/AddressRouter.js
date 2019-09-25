const Router = require('koa-router')

const address = require('../Controller/AddressController')
const user = require('../Controller/UserController')

const router = new Router

//添加地址
router.post("/address/add",user.keepLogin,address.addReceivingAddress);

module.exports = router