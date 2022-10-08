const Router = require('koa-router')

const router = new Router()
const { returnMsg, queryFn } = require('../../../utils')

//获取文章列表
router.post('/', async ctx => {
    //查询共有多少记录
    let sql = `SELECT COUNT(*) "ROWS" FROM article`
    let result = await queryFn(sql)
    let total = result[0].ROWS

    //获取当前页码和每页显示个数
    let { current, counts } = ctx.request.body
    if (!current || !counts) {
        ctx.body = returnMsg(1, '参数错误')
        return
    }
    
    let sql1 = `SELECT * FROM article LIMIT ${(current-1)*counts},${counts}`
    let result1 = await queryFn(sql1)
    ctx.body = returnMsg(0, '文章列表获取成功', {
        current,counts,total,
        arr:result1
    })
})

module.exports = router