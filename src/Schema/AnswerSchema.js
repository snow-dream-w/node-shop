const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const AnswerSchema = new Schema({
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
    userId:{
        type: ObjectId,
        required: true,
        ref:"users"
    },
    commentId:{
        type: ObjectId,
        required: true
    },
    selfId:{
        type: ObjectId,
        required: true,
        ref:"users"
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
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: "created"
    }
})

module.exports = AnswerSchema