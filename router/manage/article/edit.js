const Router = require('koa-router')
const moment = require('moment')

const router = new Router()
const { returnMsg, queryFn, jwtVerify} = require('../../../utils')

//文章编辑
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
        let { id, title, tag, content } = ctx.request.body
        //必须传的参数
        if (!id || !title || !content) {
            ctx.body = returnMsg(1, '参数错误')
            return
        }
        // 查询数据库是否有这篇文章
        let sql = `SELECT * FROM article WHERE id=${id}`
        let result = await queryFn(sql)

        if (result.length > 0) {
            // 如果result长度>0，代表有这篇文章
            let date = moment().format('YYYY-MM-DD')
            let sql1 = `UPDATE article SET title='${title}',tag='${tag || ""}',
            content='${content}',date='${date}',author='${result2[0].username}' WHERE id=${id}` 
            await queryFn(sql1)
            //更新完数据库后，返回给前端新的列表
            // let sql3 = `SELECT * FROM article`
            // let result3 = await queryFn(sql)
            //让前端跳转页面后重新请求获取新的列表
            ctx.body = returnMsg(0, '文章修改成功')
        } else {
            //文章不存在
            ctx.body = returnMsg(1, '当前编辑的文章不存在')
            return
        }
    } else {
        //没有编辑权限
        ctx.body = returnMsg(1, '该用户没有编辑权限')
        return
    }

})


module.exports = router