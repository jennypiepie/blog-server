const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const router = new Router()
const { returnMsg, queryFn } = require('../../utils')

router.post('/', async ctx => {
    let { username, password} = ctx.request.body
    if ( username && password) {
        // 登录
        // 查询数据库是否有该用户
        let sql = `SELECT * FROM user WHERE username='${username}'`
        let result = await queryFn(sql)
        if (result.length > 0) {
            //已有这个用户
            let token = jwt.sign(
                { username, password }, //  携带信息(根据username和password生成的密文)
                'jennypie',     //秘钥
                { expiresIn: '1h' }   //有效期
            )
            //更新数据库token
            let sql1 = `UPDATE user SET token = '${token}' WHERE username = '${username}'`
            await queryFn(sql1)
            // 再次查询更新后的数据
            let result1 = await queryFn(sql)
            let userMsg = {
                username: result1[0].username,
                'blog-token': result1[0].token,
                avatar: result1[0].avatar,
                player: result1[0].player,
                editable:result1[0].editable
            }
            ctx.body = returnMsg(0, '登录成功',userMsg)
        } else {
            //没有这个用户
            ctx.body = returnMsg(2, '用户不存在','用户不存在，请先注册')
        }
    } else {
        ctx.body = returnMsg(1, '请求失败', '参数错误')
    }

})

module.exports = router