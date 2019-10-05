const Car = require('../Models/CarModel')
const Goods = require('../Models/GoodsModel')
const { REQUEST_RESULT,CAR_STATUS,GOODS_STATUS,CAR_MAX_NUM } = require('../Utils/status_enum')

module.exports = class CarDao {
    /**
     * 购物车添加一条信息
     * @param {*购物车信息实例，包括用户ID userId、商品ID goodsId和商品数量num} carInfo 
     */
    async addCarInfo(carInfo) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        //判断是否下架
        let r = await Goods.findOne({ _id: carInfo.goodsId }, { _id: 0, status: GOODS_STATUS.GROUNGING })
        if (r.status !== GOODS_STATUS.GROUNGING) {
            result.data = "商品已下架！"
            return result
        }
        //判断商品是否超过购物车容量
        let count = await Car.countDocuments({ userId: carInfo.userId, status: CAR_STATUS.PUT })
        return new Promise(resolve => {
            if (count <= CAR_MAX_NUM.COUNT) {
                new Car(carInfo).save((err, data) => {
                    if (err) {
                        result.data = err
                    } else {
                        result.data = data
                        result.status = REQUEST_RESULT.SUCCESS
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
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Car.find({ userId: userId, status: CAR_STATUS.PUT })
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
                result.status = REQUEST_RESULT.SUCCESS
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
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Car.find({ orderId: orderId, status: CAR_STATUS.SETTLE })
            .populate({
                path: 'goodsId',
                select: {
                    _id: 1,
                    name: 1,
                    inventoryNum: 1
                }
            }).then(data => {
                result.status = REQUEST_RESULT.SUCCESS
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
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Car.findById(carId)
            .then(data => {
                if (!data) {
                    result.data = "数据不存在！"
                } else {
                    result.status = REQUEST_RESULT.SUCCESS
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
        return await Car.findByIdAndUpdate(carId, { $set: { status, orderId } },{new: true}).exec()
    }
    /**
     * 查询已生成及已支付未发货的订单是否在购物车中
     * @param {*订单id} orderId 
     */
    async queryPaymentedGoods(orderId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Car.find({orderId:orderId})
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
            return result
    }

}