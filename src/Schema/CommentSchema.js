const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,300}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    againstContent: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,100}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    grade: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-5]{1,1}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    niceNum: {
        type: Number,
        default: 0,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "users"
    },
    goodsId: {
        type: ObjectId,
        required: true
    }
}, {
        versionKey: false,
        timestamps: {
            createdAt: "created",
            updatedAt: "updated"
        }
    })

CommentSchema.post("remove", doc => {
    const Answer = require('../Models/AnswerModel')
    const Goods = require('../Models/GoodsModel')
    
    const { _id: commentId, goodsId: goodsId } = doc
    
    Goods.findByIdAndUpdate(goodsId, { $inc: { commentNum: -1 } }).exec()
    Answer.find({ commentId: commentId })
        .then(data => {
            data.forEach(v => v.remove())
        })

})

CommentSchema.post("save", doc => {
    const Goods = require('../Models/GoodsModel')
    const { goodsId: goodsId } = doc

    Goods.findByIdAndUpdate(goodsId, { $inc: { commentNum: 1 } }).exec()
})

module.exports = CommentSchema