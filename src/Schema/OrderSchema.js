const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema ({
    userId:{
        type: ObjectId,
        required: true
    },
    addressId:{
        type: ObjectId,
        required: true
    },
    total:{
        type :Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+\.{0,1}?[0-9]{0,2}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    status:{
        type:Number,
        default:0,
        validate: {
            validator: function (v) {
                return /^[0-9]{1,1}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: "created",
        payAt:"payed"
    }
})
module.exports = OrderSchema