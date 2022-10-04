const Router = require('koa-router')
const router = new Router()

// /web
router.get('/', ctx => {
    ctx.body = '官网数据'
})

// /web/detail
router.get('/detail', ctx => {
    ctx.body = '详情页数据'
})

module.exports = router