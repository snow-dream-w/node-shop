function setOrder() {
    $.ajax({
        url: "/order/set",
        method: "post",
        data: {
            addressId: '5d8f4c4111729149c41327a9',
            array: [
                {
                    _id: '5d91583eafe7a53ea81d2a77',
                    goodsId: '5d8f0fa58beefd1f08b381d3',
                    num: 2
                },
                {
                    _id: '5d91586c3429af4c4099e37a',
                    goodsId: '5d8f10eaf4be2943dc3b52eb',
                    num: 3
                }
            ]
        },
        success(result) {
            console.log(result);
        }
    })
}
function settleOrder() {
    $.ajax({
        url: "/order/account",
        method: "post",
        data: {
            _id: '5d9159668c0cf709b0b1e9fa'
        },
        success(result) {
            console.log(result);
        }
    })
}
function addCar() {
    $.ajax({
        url: "/car/add",
        method: "post",
        data: {
            goodsId: '5d8f10eaf4be2943dc3b52eb',
            num: 3
        },
        success(result) {
            console.log(result);
        }
    })
}
function queryCar() {
    $.ajax({
        url: "/car/get",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function delCar() {
    $.ajax({
        url: "/car/delete/5d8f11a74d3d284730ee803f",
        method: "delete",
        success(result) {
            console.log(result);
        }
    })
}