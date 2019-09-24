const Router = require('koa-router')

const user = require('../Controller/GoodsController')

const router = new Router

//商品上架
router.post("/goods/shelf",user.addGoodsInfo);

module.exports = router
