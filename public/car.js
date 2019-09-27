function addCar() {
    $.ajax({
        url: "/car/add",
        method: "post",
        data: {
            goodsId: '5d8acaecbdaa255658927c0d',
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
        url: "/car/delete/5d8e01f7b874fa02e444765c",
        method: "delete",
        success(result) {
            console.log(result);
        }
    })
}