const Address = require('../Models/AddressModel')

module.exports = class AddressDao{
    async addReceivingAddress(addressInfo){
        let result = {
            status: 0,
            data: null
        }
        return new Promise(resolve => {
            new Address(addressInfo).save((err,data) => {
                if(err){
                    result.data = err
                } else {
                    result.status = 1
                    result.data = data
                }
                resolve(result)
            })
        })
    }
}