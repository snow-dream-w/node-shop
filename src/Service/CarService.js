module.exports = class CarService{
    /**
     * 构造函数
     * @param {*购物车DAO层实例} carDao 
     * @param {*推荐Dao层实例} recommendDao 
     */
    constructor(carDao, recommendDao){
        this.carDao = carDao
        this.recommendDao = recommendDao
    }
    /**
     * 购物车添加一条信息5
     * @param {*购物车信息实例，包括用户ID userId、商品ID goodsId和商品数量num} carInfo 
     */
    async addCarInfo(carInfo){
        let result =  await this.carDao.addCarInfo(carInfo)
        if(result.status === 1){
            //更新用户-商品倒查表
            this.recommendDao.saveUserGoods(carInfo.userId, result.data.goodsId, 1)
            //更新商品-用户倒查表
            this.recommendDao.saveGoodsUser(carInfo.userId, result.data.goodsId, 1)
        }
        return result
    }
    /**
     * 获取购物车信息
     * @param {*用户ID _id} userId 
     */
    async getCarInfo(userId){
        return await this.carDao.getCarInfo(userId)
    }
    /**
     * 删除购物车信息
     * @param {*购物车ID _id} carId 
     */
    async deleteCarInfo(carId){
        return await this.carDao.deleteCarInfo(carId)
    }
}