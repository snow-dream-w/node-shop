const { Schema } = require('../Utils/connect');
const ObjectId = Schema.Types.ObjectId;

const AddressSchema = new Schema({
    userId: {
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
        default: '000000'
    },
    address: {
        area: [{
            type: String
        }],
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
    defaultAddress: {
        type: Number,
        required: true,
        default: 0
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: "created"
    }
})

module.exports = AddressSchema