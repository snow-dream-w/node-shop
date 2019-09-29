const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema ({
    userId:{
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,12}$/.test(v);
            },
            message: props => `${props.value} is not a valid,please enter 1-12 characters`
        }
    },
    telephone: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid`
        }
    },
    post: {
        type: String,
        validate: {
            validator: function(v){
                return /^[0-9]{4,6}$/.test(v);
            },
            message: props => `${props.value} is not a valid,please enter 4-6 number`
        }
    },
    address: {
        area: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true,
            validate: {
                validator: function(v){
                    return v.length < 100;
                },
                message: props => `${props.value} is not a valid,please enter 1-100 characters`
            }
        }
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
        default:1,
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
/**
 * 删除订单完成前执行的钩子函数，删除购物车中该订单的相关记录
 */
OrderSchema.post("remove",doc =>{
    const Car = require('../Models/CarModel');
    const { _id } = doc
    Car.deleteMany({orderId: _id}).exec()
})

module.exports = OrderSchema