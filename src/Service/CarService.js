module.exports = class CarService{
    /**
     * 构造函数
     * @param {*购物车DAO层实例} carDao 
     */
    constructor(carDao){
        this.carDao = carDao
    }
    /**
     * 购物车添加一条信息5
     * @param {*购物车信息实例，包括用户ID userId、商品ID goodsId和商品数量num} carInfo 
     */
    async addCarInfo(carInfo){
        return await this.carDao.addCarInfo(carInfo)
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