const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const CarSchema = new Schema ({
    orderId:{
        type: ObjectId,
        required: true
    },
    userId:{
        type: ObjectId,
        required: true
    },
    goodsId:{
        type: ObjectId,
        required: true,
        ref: "goods"
    },
    status:{
        type:Number,
        default:1,
        validate: {
            validator: function (v) {
                return /^[0-9]{1,1}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    num:{
        type:Number,
        default:0,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    }
})
module.exports = CarSchema