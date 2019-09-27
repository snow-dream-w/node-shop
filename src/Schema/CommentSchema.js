const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    content:{
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,300}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    againstContent:{
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,100}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    grade:{
        type:Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-5]{1,1}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    niceNum:{
        type:Number,
        default: 0,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    userId:{
        type: ObjectId,
        required: true,
        ref: "users"
    },
    goodsId:{
        type: ObjectId,
        required: true
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: "created",
        updatedAt:"updated"
    }
})

module.exports = CommentSchema