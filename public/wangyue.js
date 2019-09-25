function addGoods(){
    $.ajax({
        url: "/goods/shelf",
        method: "post",
        data: {
            name: "紫薯",
            description: "123",
            types: "1234",
            types:"主食",
            type:"面类",
            price:12.0,
            specification:"20",
            sales:0,
            unit:"斤",
            discount:{
                status:1,
                percent:7
            },
            inventoryNum:129,
            commentNum:0,
            status:1
        },
        success(result) {
            console.log(result);
        }
    })
}
function updateGoods(){
    $.ajax({
        url: "/goods/update",
        method: "post",
        data: {
            _id:"5d8acaecbdaa255658927c0d",
            name: "面",
            description: "23",
            types: "1234",
            types:"主食",
            type:"面类",
            price:12.0,
            specification:"20",
            sales:0,
            unit:"斤",
            discount:{
                status:1,
                percent:9
            },
            inventoryNum:129,
            commentNum:0,
            status:1
        },
        success(result) {
            console.log(result);
        }
    })
}
function getGoods(){
    $.ajax({
        url: "/goods/query",
        method: "post",
        success(result) {
            console.log(result);
        }
    })
}