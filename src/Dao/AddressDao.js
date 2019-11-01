const Address = require('../Models/AddressModel')
const { REQUEST_RESULT,ADDRESS_STATUS } = require('../Utils/status_enum')

module.exports = class AddressDao {
    /**
     * 添加收货地址
     * @param {*收货地址信息实例，包括收货人姓名name、联系方式telephone
     * 、邮编post、地址address（区域area和详细地址detail）和用户id userId} addressInfo 
     */
    async addReceivingAddress(addressInfo) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        return new Promise(resolve => {
            new Address(addressInfo).save((err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.status = REQUEST_RESULT.SUCCESS
                    result.data = data
                }
                resolve(result)
            })
        })
    }/**
     * 获取用户收货地址数量
     * @param {*用户编号} userId 
     */
    async getAddressCount(userId) {
        return await Address.countDocuments({ userId: userId })
    }
    /**
     * 获取收货地址
     * @param {*限制获取数量} limit 
     */
    async getReceivingAddress(userId,limit) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Address.find({userId:userId})
            .limit(limit)
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            })
            .catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 获取地址详情
     * @param {*订单id} addressId 
     */
    async getAddressDetail(addressId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Address.findOne({ _id: addressId })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            })
            .catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 修改收货地址
     * @param {*收货地址信息实例，包括地址ID _id、收货人姓名name、联系方式telephone
     * 、邮编post、地址address（区域area和详细地址detail）和用户id userId} addressInfo
     */
    async editAddressInfo(addressInfo) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Address.findOneAndUpdate({ _id: addressInfo._id }, { $set: addressInfo }, { runValidators: true, new: true })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            })
            .catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 删除收货地址
     * @param {*地址ID} addressInfo 
     */
    async delReceivingAddress(addressId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Address.deleteOne({ _id: addressId })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            })
            .catch(err => {
                result.status = REQUEST_RESULT.FAIL
                result.data = err
            })
        return result
    }
    /**
     * 检测是否为默认地址
     * @param {*地址编号} addressId 
     */
    async isDefaultAddress(addressId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Address.findOne({ _id: addressId })
            .then(data => {
                if (data && data.defaultAddress === ADDRESS_STATUS.DEFAULT) {
                    result.status = REQUEST_RESULT.SUCCESS
                    result.data = "默认地址不可删除"
                }
            })
        return result
    }
    /**
     * 设置默认地址
     * @param {*用户_id} userId 
     * @param {*地址_id} addressId 
     */
    async defaultReceivingAddress(addressId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Address.updateOne({ _id: addressId }, { $set: { defaultAddress: ADDRESS_STATUS.DEFAULT } })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    /**
     * 重置地址状态统一为非默认
     * @param {*用户编号} userId 
     */
    async resetAddressStatus(userId) {
        let result = {
            status: REQUEST_RESULT.FAIL,
            data: null
        }
        await Address.updateMany({ userId: userId }, { $set: { defaultAddress: ADDRESS_STATUS.UNDEFAULT } })
            .then(data => {
                result.status = REQUEST_RESULT.SUCCESS
                result.data = data
            }).catch(err => {
                result.data = err
            })
        return result
    }
    // /**
    //  * 获取用户默认地址
    //  * @param {*用户编号} userId 
    //  */
    // async getDefaultAddress(userId) {
    //     return await Address.findOne({$and:[{userId: userId},{defaultAddress: 1}]})
    // }
}