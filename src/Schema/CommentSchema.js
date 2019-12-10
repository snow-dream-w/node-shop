const { Schema } = require('../Utils/connect');
const { CAR_STATUS } = require('../Utils/status_enum')
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
        default: '无',
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,100}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    grade: {
        type: Number,
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
    answerNum: {
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
    },
    carsId: {
        type: ObjectId,
        required: true,
    }
}, {
        versionKey: false,
        timestamps: {
            createdAt: "created",
            updatedAt: "updated"
        }
    })
/**
 * 删除评论完成前执行的钩子函数，修改商品评论数量，删除此评论的回复
 */
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
/**
 * 添加评论完成前执行的钩子函数，修改商品评论数量
 */
CommentSchema.post("save", doc => {
    const Goods = require('../Models/GoodsModel')
    const Car = require('../Models/CarModel')
    const { goodsId: goodsId, carsId } = doc
    Car.findByIdAndUpdate(carsId,{$set: {status: CAR_STATUS.COMMENT}}).exec()
    Goods.findByIdAndUpdate(goodsId, { $inc: { commentNum: 1 } }).exec()
})

module.exports = CommentSchema