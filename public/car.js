function setOrder(){
    $.ajax({
        url: "/order/set",
        method: "post",
        data: {
            addressId: '5d8f4c4111729149c41327a9',
            array: [
                {
                    _id: '5d8f11631dc5a44a6ce6573d',
                    goodsId: '5d8f0fa58beefd1f08b381d3',
                    num: 2
                },
                {
                    _id: '5d8f11bdb73a2c46580a0a82',
                    goodsId: '5d8f102c1b54af0c789f2ad5',
                    num: 3
                }
            ]
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
            num: 1
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