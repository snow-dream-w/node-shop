function delAddress() {
    $.ajax({
        url: "/address/delete/5d8ca9f763636a4f8ca0cdfa",
        method: "delete",
        success(result) {
            console.log(result);
        }
    })
}
function defaultAddress() {
    $.ajax({
        url: "/address/default",
        method: "post",
        data: {
            _id: '5d8ca9df63636a4f8ca0cdf8'
        },
        success(result) {
            console.log(result);
        }
    })
}
function queryAddress() {
    $.ajax({
        url: "/address/get/2",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function detailAddress() {
    $.ajax({
        url: "/address/detail/5d8c31719112491b2c6e2524",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function changeAddress() {
    $.ajax({
        url: "/address/update",
        method: "post",
        data: {
            _id: '5d8c31719112491b2c6e2524',
            name: '陈乾坤',
            telephone: '17865579761',
            post: '654321',
            address: {
                area: '山东省 烟台市 莱山区',
                details: '山东工商学院西校区'
            }
        },
        success(result) {
            console.log(result);
        }
    })
}
function changepassword() {
    $.ajax({
        url: "/user/edit/password",
        method: "post",
        data: {
            oldPassword: 'qiankun19950629',
            newPassword: 'qiankun1995'
        },
        success(result) {
            console.log(result);
        }
    })
}
function register() {
    $.ajax({
        url: "/user/register",
        method: "post",
        data: {
            telephone: '17865579761',
            password: 'qiankun1995',
            sex: '男'
        },
        success(result) {
            console.log(result);
        }
    })
}
function person() {
    $.ajax({
        url: "/user/person",
        method: "get",
        success(result) {
            console.log(result);
        }
    })
}
function edit() {
    $.ajax({
        url: "/user/edit/info",
        method: "post",
        data: {
            name: '吾忆那年秋',
            sex: '男'
        },
        success(result) {
            console.log(result);
        }
    })
}
function addAddress() {
    $.ajax({
        url: "/address/add",
        method: "post",
        data: {
            name: '吾忆那年秋',
            telephone: '17865579761',
            post: '123456',
            address: {
                area: '山东省 烟台市 莱山区',
                details: '山东工商学院'
            }
        },
        success(result) {
            console.log(result);
        }
    })
}