const Router = require('koa-router')

const router = new Router()
const { returnMsg, queryFn } = require('../../utils')


router.post('/', async ctx => {
    let { username, password} = ctx.request.body
    if (username && password) {
        //注册
        // 查询数据库是否有该用户
        let sql = `SELECT * FROM user WHERE username='${username}'`
        let result = await queryFn(sql)
        if (result.length > 0) {
            //已有这个用户
            ctx.body = returnMsg(2, '注册失败', '该用户已注册')
        } else {
            //没有这个用户
            let sql1 = `INSERT INTO user VALUES (null,'${username}','${password}',null,'avatar.jpg','normal',0)`
            await queryFn(sql1)
            ctx.body = returnMsg(0,'注册成功')
        }
    }
})

module.exports = router