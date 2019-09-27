const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const CarSchema = new Schema({
    orderId: ObjectId,
    userId: {
        type: ObjectId,
        required: true
    },
    goodsId: {
        type: ObjectId,
        required: true,
        ref: "goods"
    },
    status: {
        type: Number,
        default: 1,
        validate: {
            validator: function (v) {
                return /^[0-9]{1,1}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    num: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created"
    }
})

CarSchema.post("save", doc => {
    const User = require('../Models/UserModel')
    const { userId } = doc;
    User.findByIdAndUpdate(userId,{$inc: {busNum: 1}}).exec()
})
CarSchema.post("remove", doc => {
    const User = require('../Models/UserModel')
    const { userId } = doc;
    User.findByIdAndUpdate(userId,{$inc: {busNum: -1}}).exec()
})

module.exports = CarSchema