function addGoods(){
    $.ajax({
        url: "/goods/add",
        method: "post",
        data: {
            name: "耳机",
            description: "123",
            types: "12",
            types:"配件",
            type:"手机配件",
            price:10.0,
            specification:"20",
            sales:0,
            unit:"斤",
            discount:{
                status:1,
                percent:1
            },
            inventoryNum:5,
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
        url: "/goods/goodsDetail/5d8f102c1b54af0c789f2ad5",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function orderPaymentedInfo() {
    $.ajax({
        url: "/order/orderInfo/1",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function orderCompletedInfo() {
    $.ajax({
        url: "/order/orderInfo/1",
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
            content:"这是评论内容5",
            grade:5,
            goodsId:"5d8f10eaf4be2943dc3b52eb"
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
            commentId:"5d90666b7e03f23ccc5fe262"
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
           _id:"5d90666b7e03f23ccc5fe262"
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
            commentId:"5d90666b7e03f23ccc5fe262"
        },
        success(result) {
            console.log(result);
        }
    })
}
function cancelOrder() {
    $.ajax({
        url: "/order/cancel",
        method: "post",
        data:{
            _id: "5d8f5e3875fa704730ab2851"
        },
        success(result) {
            console.log(result);
        }
    })
}
function deleteComment() {
    $.ajax({
        url:"/comment/delete/5d8ffa11742cd44c4001dfcc",
        method:"delete",
        success(result) {
            console.log(result);
        }
    })
}
function deleteOrder() {
    $.ajax({
        url:"/orders/delete/5d90114bfdfb2f2150b07791",
        method:"delete",
        success(result) {
            console.log(result);
        }
    })
}