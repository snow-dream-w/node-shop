const Router = require('koa-router')
const fs = require('fs')

const goods = require('../Controller/GoodsController')
const user = require('../Controller/UserController')
const upload_goods_image = require('../Utils/upload_goods_image')

const router = new Router

//商品上架
router.post("/goods/add", user.keepLogin, goods.addGoodsInfo);

//修改商品信息
router.post("/goods/update", user.keepLogin, goods.updateGoodsInfo);

//获取商品信息
router.get("/goods/query",goods.getGoodsInfo);

//商品下架
router.post("/goods/shelves", user.keepLogin, goods.shelfGoodsInfo);

//商品详情
router.get("/goods/goodsDetail/:id",goods.getGoodsDetail);

//删除已下架商品
router.post("/goods/delete", user.keepLogin, goods.deleteGoodsInfo);

//更新商品图片
router.post("/goods/upload_goods_image", upload_goods_image.single("file"), goods.updateGoodsImage);

//获取下架商品
router.get("/goods/shelf/:status", user.keepLogin, goods.getShelfGoods);

//获取推荐商品
router.get("/goods/recommend/user", user.keepLogin, goods.getRecommendGoods);

//获取热门商品
router.get("/goods/hot/:limit", goods.getHotGoods)

//移除商品图片
router.post("/goods/dropImage",async ctx => {
    let result = {
        status: 0,
        data: null
    }
    console.log(ctx.request.body.filename);
    
    await fs.unlink("public"+ctx.request.body.filename,err => {
        if(err){
            result.data = err
        }
        result.status = 1
    })
    return ctx.body = result
})

module.exports = router
