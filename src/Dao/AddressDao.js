const Address = require('../Models/AddressModel')

module.exports = class AddressDao {
    /**
     * 添加收货地址
     * @param {*收货地址信息实例，包括收货人姓名name、联系方式telephone
     * 、邮编post、地址address（区域area和详细地址detail）和用户id userId} addressInfo 
     */
    async addReceivingAddress(addressInfo) {
        let result = {
            status: 0,
            data: null
        }
        let n = await Address.countDocuments()
        if (n === 0) {
            addressInfo.defaultAddress = 1
        }
        return new Promise(resolve => {
            new Address(addressInfo).save((err, data) => {
                if (err) {
                    result.data = err
                } else {
                    result.status = 1
                    result.data = data
                }
                resolve(result)
            })
        })
    }
    /**
     * 获取收货地址
     * @param {*限制获取数量} limit 
     */
    async getReceivingAddress(limit) {
        let result = {
            status: 0,
            data: null
        }
        await Address.find({})
            .limit(limit)
            .then(data => {
                result.status = 1
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
            status: 0,
            data: null
        }
        await Address.findOne({ _id: addressId })
            .then(data => {
                result.status = 1
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
            status: 0,
            data: null
        }
        await Address.findOneAndUpdate({ _id: addressInfo._id }, { $set: addressInfo }, { runValidators: true, new: true })
            .then(data => {
                result.status = 1
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
            status: 0,
            data: null
        }
        await Address.findOne({ _id: addressId }, { defaultAddress: 1 })
            .then(data => {
                if(data.defaultAddress === 1){
                    result.status = 1
                }  
            })
        if(result.status === 1){
            result.status = 0
            result.data = "默认地址不可删除"
            return result
        }
        await Address.deleteOne({ _id: addressId })
            .then(data => {
                result.status = 1
                result.data = data
            })
            .catch(err => {
                result.status = 0
                result.data = err
            })
        return result
    }
    /**
     * 设置默认地址
     * @param {*用户_id} userId 
     * @param {*地址_id} addressId 
     */
    async defaultReceivingAddress(userId, addressId) {
        let result = {
            status: 0,
            data: null
        }
        await Address.updateMany({ userId: userId }, { $set: { defaultAddress: 0 } })
            .then(data => {
                result.status = 1
                result.data = data
            }).catch(err => {
                result.data = err
            })
        if (result.status === 1) {
            await Address.updateOne({ _id: addressId }, { $set: { defaultAddress: 1 } })
                .then(data => {
                    result.data = data
                }).catch(err => {
                    result.status = 1
                    result.data = err
                })
        }
        return result
    }
}