const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const User_Goods = new Schema({
    goodsId: {
        type: ObjectId,
        required: true
    },
    userId:  {
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
module.exports = User_Goods