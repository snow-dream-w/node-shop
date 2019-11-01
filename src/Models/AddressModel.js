const { db } = require('../Utils/connect')
const AddressSchema = require('../Schema/AddressSchema')

const Address = db.model('addresses', AddressSchema)

module.exports = Address