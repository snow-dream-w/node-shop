const Car = require('../Models/CarModel')
const Goods = require('../Models/GoodsModel')

module.exports = class CarDao {
    /**
     * 购物车添加一条信息
     * @param {*购物车信息实例，包括用户ID userId、商品ID goodsId和商品数量num} carInfo 
     */
    async addCarInfo(carInfo) {
        let result = {
            status: 0,
            data: null
        }
        //判断是否下架
        let r = await Goods.findOne({ _id: carInfo.goodsId }, { _id: 0, status: 1 })
        if (r.status !== 1) {
            result.data = "商品已下架！"
            return result
        }
        //判断商品是否超过购物车容量
        let count = await Car.countDocuments({ userId: carInfo.userId, status: 1 })
        return new Promise(resolve => {
            if (count <= 100) {
                new Car(carInfo).save((err, data) => {
                    if (err) {
                        result.data = err
                    } else {
                        result.data = data
                        result.status = 1
                    }
                    resolve(result)
                })
            } else {
                result.data = "购物车数量已达到100上限！"
                resolve(result)
            }
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
     * 获取订单相关购物车信息
     * @param {*订单编号} orderId 
     */
    async getOrderGoods(orderId) {
        let result = {
            status: 0,
            data: null
        }
        await Car.find({ orderId: orderId, status: 2 })
            .populate({
                path: 'goodsId',
                select: {
                    _id: 1,
                    name: 1,
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
    /**
     * 更新购物车商品状态
     * @param {*购物车编号} carId 
     * @param {*状态值} status 
     * @param {*订单编号} orderId 
     */
    async updateCarInfo(carId, status, orderId) {
        await Car.findByIdAndUpdate(carId, { $set: { status, orderId } }).exec()
    }
}