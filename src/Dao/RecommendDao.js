const UserGoods = require('../Models/User_Goods');
const GoodsUser = require('../Models/Goods_User');

module.exports = class OrderDao {
    /**
     * 保存用户-商品倒排表
     * @param {*用户编号} userId 
     * @param {*商品编号} goodsId 
     * @param {*权重} weight 
     */
    saveUserGoods(userId, goodsId, weight) {
        new UserGoods({goodsId, userId, weight}).save()
    }
    /**
     * 保存商品-用户倒排表
     * @param {*用户编号} userId 
     * @param {*商品编号} goodsId 
     * @param {*权重} weight 
     */
    saveGoodsUser(userId, goodsId, weight) {
        new GoodsUser({userId, goodsId, weight}).save()
    }
}
