const ADDRESS_STATUS = {
    UNDEFAULT : 0,
    DEFAULT : 1
}
const CAR_STATUS = {
    PUT : 1,
    SETTLE : 2,
    COMMENT : 3,
    AGAINSTCOMMENT : 4
}
const GOODS_STATUS = {
    UNDERCARRIAGE : 0,
    GROUNGING : 1,
    DELETE : 2
}
const ORDER_STATUS = {
    CANCEL : 0,
    ESTABLISH : 1,
    SETTLE : 2,
    TRANSPORT : 3,
    COMPLETE : 4
}
const REQUEST_RESULT = {
    SUCCESS : 1,
    FAIL : 0
}
const CAR_MAX_NUM = {
    COUNT: 100
}
const WEIGHT = {
    PUT_CAR : 1,
    SET_ORDER : 2,
    ORDER_SETTLE : 3
}
const DISCOUNT_STATUS = {
    ALLOWED : 1,
    UNALLOWED : 0
}
const SIGN = {
    POSITIVE : 1,
    NEGATIVE : -1
}

module.exports={
    ADDRESS_STATUS,
    CAR_STATUS,
    GOODS_STATUS,
    ORDER_STATUS,
    REQUEST_RESULT,
    CAR_MAX_NUM,
    WEIGHT,
    DISCOUNT_STATUS,
    SIGN
}