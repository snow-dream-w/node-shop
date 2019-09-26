
module.exports = class AddressService {
    /**
     * 
     * @param {*收货地址Dao层实例} addressDao 
     */
    constructor(addressDao) {
        this.addressDao = addressDao
    }
    /**
     * 添加收货地址
     * @param {*收货地址信息实例，包括收货人姓名name、联系方式telephone
     * 、邮编post、地址address（区域area和详细地址detail）和用户id userId} addressInfo 
     */
    async addReceivingAddress(addressInfo) {
        return await this.addressDao.addReceivingAddress(addressInfo)
    }
    /**
     * 获取收货地址
     * @param {*限制获取数量} limit 
     */
    async getReceivingAddress(limit) {
        return await this.addressDao.getReceivingAddress(limit)
    }
    /**
     * 获取地址详情
     * @param {*订单id} addressId 
     */
    async getAddressDetail(addressId) {
        return await this.addressDao.getAddressDetail(addressId)
    }
    /**
     * 修改收货地址
     * @param {*收货地址信息实例，包括地址ID _id、收货人姓名name、联系方式telephone
     * 、邮编post、地址address（区域area和详细地址detail）和用户id userId} addressInfo
     */
    async editAddressInfo(addressInfo) {
        return await this.addressDao.editAddressInfo(addressInfo)
    }
    /**
     * 删除收货地址
     * @param {*地址ID} addressId
     */
    async delReceivingAddress(addressId) {
        return await this.addressDao.delReceivingAddress(addressId)
    }
    /**
     * 设置默认地址
     * @param {*用户_id} userId 
     * @param {*地址_id} addressId 
     */
    async defaultReceivingAddress(userId, addressId) {
        return await this.addressDao.defaultReceivingAddress(userId, addressId)
    }
}