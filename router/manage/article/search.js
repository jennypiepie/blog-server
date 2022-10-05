const Router = require('koa-router')

const router = new Router()
const { returnMsg, queryFn, jwtVerify} = require('../../../utils')

//根据前端传过来的id获取文章
router.get('/', async ctx => {
    let token = ctx.request.headers['blog-token']
    //鉴权
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, 'token过期或该用户不存在', 'token过期或该用户不存在')
        return
    }
    let { id } = ctx.request.body
    // 查询数据库是否有这篇文章
    let sql = `SELECT * FROM article WHERE id=${id}`
    let result = await queryFn(sql)
    if (result.length > 0) {
        ctx.body = returnMsg(0, '请求成功', result[0])
    } else {
        ctx.body = returnMsg(1, '该文章已不存在')
    }
})

module.exports = router