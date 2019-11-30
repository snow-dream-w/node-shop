const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const Goods_User = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    goodsId:  {
        type: ObjectId,
        required: true
    },
    sex: {
        type: String,
        default: '男',
        validate: {
            validator: function (v) {
                return /^[男女]{1,1}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    weight:  {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created"
    }
})
module.exports = Goods_User