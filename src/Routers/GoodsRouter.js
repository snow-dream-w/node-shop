const Router = require('koa-router')

const goods = require('../Controller/GoodsController')
const user = require('../Controller/UserController')

const router = new Router

//商品上架
router.post("/goods/add",user.keepLogin,goods.addGoodsInfo);

//修改商品信息
router.post("/goods/update",user.keepLogin,goods.updateGoodsInfo);

//获取商品信息
router.get("/goods/query/:limit",user.keepLogin,goods.getGoodsInfo);

//商品下架
router.post("/goods/shelves",user.keepLogin,goods.shelfGoodsInfo);

//商品详情
router.get("/goods/goodsDetail/:id",user.keepLogin,goods.getGoodsDetail);

//删除已下架商品
router.post("/goods/delete",user.keepLogin,goods.deleteGoodsInfo);

module.exports = router
