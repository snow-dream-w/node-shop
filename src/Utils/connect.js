const mongoose = require('mongoose');

//连接数据库
const db = mongoose.createConnection('mongodb://qiankun:123456@47.94.162.87:27017/shop',{useNewUrlParser:true});
//用原生的promise替代schema的promise
mongoose.Promise = global.Promise;
//取出Schema
const Schema = mongoose.Schema;
// findAndModify驱动即将被废弃，禁用
mongoose.set('useFindAndModify', false);

db.on('error',console.log.bind(console,'数据库连接失败'));
db.on('open',()=>{
    console.log('数据库连接成功!');
})

module.exports = {
    db,
    Schema
}