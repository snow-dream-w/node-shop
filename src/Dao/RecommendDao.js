const UserGoods = require('../Models/User_Goods');
const GoodsUser = require('../Models/Goods_User');
const User = require('../Models/UserModel');

module.exports = class OrderDao {
    /**
     * 保存用户-商品倒排表
     * @param {*用户编号} userId 
     * @param {*商品编号} goodsId 
     * @param {*权重} weight 
     */
    saveUserGoods(userId, goodsId, weight) {
        User.findOne({ _id: userId }, { sex: 1 }).then(result => {
            const sex = result.sex
            new UserGoods({ goodsId, userId, sex, weight }).save()
        })
    }
    /**
     * 保存商品-用户倒排表
     * @param {*用户编号} userId 
     * @param {*商品编号} goodsId 
     * @param {*权重} weight 
     */
    saveGoodsUser(userId, goodsId, weight) {
        User.findOne({ _id: userId }, { sex: 1 }).then(result => {
            const sex = result.sex
            new GoodsUser({ userId, goodsId, weight }).save()
        })
    }
    /**
     * 获取倒查表数据
     */
    async getUserGoodsInfo() {
        return await UserGoods.find({ weight: 3 }, { _id: 0, userId: 1, goodsId: 1, sex: 1 })
    }
    /**
     * 获取热门商品
     * @param {*限制数量} limit 
     */
    async getHotGoods(limit) {
        return await UserGoods.aggregate([{ $match: { weight: 3 } }, { $group: { _id: '$goodsId', count: { $sum: 1 } } }])
            .sort({ count: -1 }).limit(limit)
    }
    /**
     * 获取用户初始推荐
     * @param {*限制数量} limit 
     * @param {*用户性别} sex 
     */
    async getInitialRecommend(limit, sex) {
        return await UserGoods.aggregate([{ $match: { weight: 3, sex: sex } }, { $group: { _id: '$goodsId', count: { $sum: 1 } } }])
            .sort({ count: -1 }).limit(limit)
    }
}
