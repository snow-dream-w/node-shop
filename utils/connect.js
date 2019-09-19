const mongoose = require('mongoose')

//连接数据库
const db = mongoose.createConnection
('mongodb://qiankun:123456@47.94.162.87:27017/shop',{useNewUrlParser:true})

// 用原生es6代替mongoose自带的promise
mongoose.Promise = global.Promise

//把mongoose 的schema取出来
const Schema = mongoose.Schema

//连接失败
db.on("error", console.log.bind(console, "shop数据库连接失败"))

//连接成功
db.on("open", () => {
    console.log("shop连接成功")
})

module.exports = {
    db,
    Schema
}