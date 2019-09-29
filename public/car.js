function setOrder() {
    $.ajax({
        url: "/order/set",
        method: "post",
        data: {
            addressId: '5d8f4c4111729149c41327a9',
            array: [
                {
                    _id: '5d90122f779f2b4974791375',
                    goodsId: '5d8f102c1b54af0c789f2ad5',
                    num: 2
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
            _id: '5d901334b309d01b945c44b5'
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
            goodsId: '5d8f102c1b54af0c789f2ad5',
            num: 2
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