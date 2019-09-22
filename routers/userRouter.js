const Router = require('koa-router')
const fs = require('fs')
const {join} = require('path')

const user = require('../Controller/user')

const router = new Router

router.get("/", async (ctx) => {
    ctx.body = fs.readFileSync(join(__dirname, "../public/index.html"),'utf-8')
})

router.post("/user/register",user.reg)

router.get("/user/:id",(ctx) => {
    ctx.body = ctx.params.id
})

module.exports = router