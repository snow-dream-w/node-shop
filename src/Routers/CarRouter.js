const Router = require('koa-router')

const user = require('../Controller/UserController')
const car = require('../Controller/CarController')

const router = new Router

//添加商品到购物车
router.post("/car/add",user.keepLogin,car.addCarInfo)

//获取购物车商品
router.get("/car/get",user.keepLogin,car.getCarInfo)

//获取购物车商品
router.del("/car/delete/:id",user.keepLogin,car.deleteCarInfo)

module.exports = router