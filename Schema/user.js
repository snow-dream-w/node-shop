const { Schema } = require('../utils/connect');

const UserSchema = new Schema({
    telephone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, '注册手机号不能为空']
    },
    name: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{4,12}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    avatar: {
        type: String,
        default: '/avatar/default.png',
        validate: {
            validator: function (v) {
                return /\w(\.jpeg|\.png|\.jpg)/i.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
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
    password: {
        type: String,
        validate: {
            validator: function (v) {
                return /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/.test(v);
            },
            message: props => `${props.value} is not a valid password`
        }
    },
    money: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d+\.{0,1}?[0-9]{0,2}$/.test(v);
            },
            message: props => `${props.value} is not a valid`
        }
    },
    busNum: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid`
        }
    },
    perference: Array,
    role: {
        type: String,
        default: 1
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created"
    }
})

module.exports = UserSchema