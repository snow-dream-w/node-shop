const Car = require('../Models/CarModel')

module.exports = class CarDao {
    /**
     * 购物车添加一条信息5
     * @param {*购物车信息实例，包括用户ID userId、商品ID goodsId和商品数量num} carInfo 
     */
    async addCarInfo(carInfo) {
        let result = {
            status: 0,
            data: null
        }
        return new Promise(resolve => {
            new Car(carInfo).save((err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.data = data
                    result.status = 1
                }
                resolve(result)
            })
        })
    }
    /**
     * 获取购物车信息
     * @param {*用户ID _id} userId 
     */
    async getCarInfo(userId) {
        let result = {
            status: 0,
            data: null
        }
        await Car.find({ userId: userId, status: 1 })
            .populate({
                path: 'goodsId',
                select: {
                    _id: 1,
                    discount: 1,
                    description: 1,
                    name: 1,
                    price: 1,
                    unit: 1,
                    inventoryNum: 1
                }
            }).then(data => {
                result.status = 1
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 删除购物车信息
     * @param {*购物车ID _id} carId 
     */
    async deleteCarInfo(carId) {
        let result = {
            status: 0,
            data: null
        }
        await Car.findById(carId)
            .then(data => {
                if (!data) {
                    result.data = "数据不存在！"
                } else {
                    result.status = 1
                    result.data = data
                    data.remove()
                }
            }).catch(err => {
                result.data = err
            })
        return result
    }
}