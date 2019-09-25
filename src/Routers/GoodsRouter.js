const Router = require('koa-router')

const goods = require('../Controller/GoodsController')

const router = new Router

//商品上架
router.post("/goods/shelf",goods.addGoodsInfo);

//修改商品信息
router.post("/goods/update",goods.updateGoodsInfo);

//获取商品信息
router.post("/goods/query",goods.getGoodsInfo);

module.exports = router
