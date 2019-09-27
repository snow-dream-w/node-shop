function addGoods(){
    $.ajax({
        url: "/goods/add",
        method: "post",
        data: {
            name: "紫薯米",
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
            name: "面条",
            description: "1123",
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
        url: "/goods/query/2",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function shelfGoods() {
    $.ajax({
        url: "/goods/shelves",
        method: "post",
        data:{
            _id:"5d8bfff3b0234a4028088e94",
        },
        success(result) {
            console.log(result);
        }
    })
}
function GoodsDetail() {
    $.ajax({
        url: "/goods/goodsDetail/5d8bfff3b0234a4028088e94",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function orderPaymentedInfo() {
    $.ajax({
        url: "/orders/orderInfo/2",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function orderCompletedInfo() {
    $.ajax({
        url: "/orders/orderInfo/3",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function addComment() {
    $.ajax({
        url: "/comment/add",
        method: "post",
        data: {
            content:"这是评论内容",
            grade:5,
            goodsId:"5d8bfff3b0234a4028088e94"
        },
        success(result) {
            console.log(result);
        }
    })
}
function appendComment() {
    $.ajax({
        url: "/comment/append",
        method: "post",
        data: {
            againstContent:"这是追加的评论内容",
            commentId:"5d8ca84ad736841e10209fe6"
        },
        success(result) {
            console.log(result);
        }
    })
}
function clickNice() {
    $.ajax({
        url: "/comment/nice",
        method: "post",
        data: {
           _id:"5d8ca84ad736841e10209fe6"
        },
        success(result) {
            console.log(result);
        }
    })
}
function getComments(){
    $.ajax({
        url: "/comment/query/2",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function addRespond() {
    $.ajax({
        url: "/answer/add",
        method: "post",
        data: {
            content:"这是回复评论内容",
            userId:"5d8c0f35b650a705e0f21e82",
            commentId:"5d8bfff3b0234a4028088e94"
        },
        success(result) {
            console.log(result);
        }
    })
}
function cancelOrder() {
    $.ajax({
        url: "/orders/cancel",
        method: "post",
        data:{
            _id:""
        },
        success(result) {
            console.log(result);
        }
    })
}