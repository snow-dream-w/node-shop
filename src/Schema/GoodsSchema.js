const { Schema } = require('../Utils/connect');

const GoodsSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,50}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    description: {
        type: String,
        default:'无',
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,300}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }

    },
    images: [{
        type: String,
        validate: {
            validator: function (v) {
                return /\w(\.jpeg|\.png|\.jpg)/i.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    }],
    types: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z_-\u4e00-\u9fa5]{1,20}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z_-\u4e00-\u9fa5]{1,20}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+\.{0,1}?[0-9]{0,2}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    specification: {
        type: String,
        default:'无',
        validate: {
            validator: function (v) {
                return /^[0-9a-zA-Z\u4e00-\u9fa5]{0,100}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    sales: {
        type: Number,
        default:0,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    unit: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\u4e00-\u9fa5]{1,2}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    discount: {
            status: {
                type: Number,
                default:1,
                validator: function (v) {
                    return /^[0-9]{1,1}$/.test(v);
                },
                message: props => `${props.value} is not a valid value`
            },
            percent: {
                type: Number,
                default:1,
                validator: function (v) {
                    return /^[0]+\.[0-9]{0,2}$/.test(v);
                },
                message: props => `${props.value} is not a valid value`

            }
    },
    inventoryNum: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    commentNum: {
        type: Number,
        default:0,
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    },
    status: {
        type: Number,
        default:1,
        validate: {
            validator: function (v) {
                return /^[0-9]{1,1}$/.test(v);
            },
            message: props => `${props.value} is not a valid value`
        }
    }
}, {
        versionKey: false,
        timestamps: {
            createdAt: "created",
            updatedAt:"updated"
        }
    })
    module.exports = GoodsSchema