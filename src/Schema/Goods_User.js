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