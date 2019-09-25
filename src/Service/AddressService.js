
module.exports = class AddressService{
    constructor(addressDao){
        this.addressDao = addressDao
    }
    async addReceivingAddress(addressInfo){
        return await this.addressDao.addReceivingAddress(addressInfo) 
    }
}