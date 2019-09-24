

/**
 * 商品上架
 */
exports.addGoodsInfo =  async (ctx) => {
    //接收参数
    const user = ctx.request.body

    //session不存在
    if (ctx.session.isNew) {
        return ctx.body = {
            status : 0,
            msg : "未登录"
        }
    }
    // await new Promise(async (resolve , reject) => {
    //     let result = await 
    // })

}