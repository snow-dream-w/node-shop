const { REQUEST_RESULT,ADDRESS_STATUS } = require('../Utils/status_enum')
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
        //查看地址数量
        const n = await this.addressDao.getAddressCount(addressInfo.userId)
        if(n === 0){
            //若地址数量为0，则设为默认地址1
            addressInfo.defaultAddress = ADDRESS_STATUS.DEFAULT
        }
       return await this.addressDao.addReceivingAddress(addressInfo)
    }
    /**
     * 获取收货地址
     * @param {*限制获取数量} limit 
     */
    async getReceivingAddress(userId,limit) {
        return await this.addressDao.getReceivingAddress(userId,limit)
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
        //判断当前地址是否为默认地址
        let result = await this.addressDao.isDefaultAddress(addressId)
        if(result.status === REQUEST_RESULT.SUCCESS){
            //如果是默认地址则返回提示信息
            return result
        }
        return await this.addressDao.delReceivingAddress(addressId)
    }
    /**
     * 设置默认地址
     * @param {*用户_id} userId 
     * @param {*地址_id} addressId 
     */
    async defaultReceivingAddress(userId, addressId) {
        //重置所有地址为非默认
        const reset = await this.addressDao.resetAddressStatus(userId)
        if(reset.status === REQUEST_RESULT.FAIL){
            return {
                status: REQUEST_RESULT.FAIL,
                data: "404"
            }
        }
        return await this.addressDao.defaultReceivingAddress(addressId)
    }
}