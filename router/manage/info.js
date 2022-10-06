const Router = require('koa-router')

const router = new Router()
const { returnMsg, queryFn, jwtVerify} = require('../../utils')

//查询用户信息
router.get('/', async ctx => {
    let token = ctx.request.headers['blog-token']
    //鉴权
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, 'token过期', 'token过期')
        return
    }

    // 查询数据库是否有这个用户
    let sql = `SELECT username,password,avatar FROM user WHERE token='${token}'`
    let result = await queryFn(sql)
    ctx.body = returnMsg(0, '请求成功', result[0])

})

//修改用户信息
router.post('/', async ctx => {
    let token = ctx.request.headers['blog-token']
    //鉴权
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, 'token过期', 'token过期')
        return
    }

    let { username, password } = ctx.request.body
    //查看是否重名
    let sql2 = `SELECT * FROM user WHERE username='${username}'`
    let result2 = await queryFn(sql2)
    if (result2.length > 0) {
        ctx.body = returnMsg(1, '用户名已存在')
        return
    }
    // 修改数据库中的数据
    let sql = `UPDATE user SET username='${username}',password='${password}' WHERE token='${token}'`
    await queryFn(sql)
    //重新查询用户信息返回给前端
    let sql1 = `SELECT username,password,avatar FROM user WHERE token='${token}'`
    let result = await queryFn(sql1)
    ctx.body = returnMsg(0, '修改成功', result[0])
})

module.exports = router