const Router = require('koa-router')
const moment = require('moment')

const router = new Router()
const { returnMsg, queryFn, jwtVerify} = require('../../../utils')

//文章添加
router.post('/', async ctx => {
    let token = ctx.request.headers['blog-token']
    //鉴权
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, 'token过期或该用户不存在', 'token过期或该用户不存在')
        return
    }
    //查看该用户是否有编辑权限
    let sql2 = `SELECT editable, username FROM user WHERE token='${token}'`
    let result2 = await queryFn(sql2)
    if (result2[0].editable === 1) {
        //有编辑权限
        let { title, tag, content } = ctx.request.body
        //必须传的参数
        if (!title || !content) {
            ctx.body = returnMsg(1, '参数错误')
            return
        }

        let date = moment().format('YYYY-MM-DD')
        //添加文章
        let sql1 = `INSERT INTO article VALUES (null,'${title}','${tag || ""}',
        '${result2[0].username}','${date}','${content}')` 
        await queryFn(sql1)
        ctx.body = returnMsg(0, '文章添加成功')

    } else {
        //没有编辑权限
        ctx.body = returnMsg(1, '该用户没有编辑权限')
        return
    }

})


module.exports = router