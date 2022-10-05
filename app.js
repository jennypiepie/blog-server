const Koa = require('koa2')
const Router = require('koa-router')
const cors = require('koa2-cors')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

const { port, host } = require('./utils')
const manage = require('./router/manage')
const web = require('./router/web')
const nomatch = require('./router/nomatch')

const path = require('path')


//路由
router.get('/', async ctx => {
    ctx.body = '首页数据'
})


//路由拆分
router.use('/manage', manage.routes(), manage.allowedMethods())
router.use('/web', web.routes(), web.allowedMethods())
router.use('/404', nomatch.routes(),nomatch.allowedMethods())

//路由重定向
// router.redirect('/','/web')

//重定向到404
app.use(async (ctx, next) => {
    await next()
    //一旦状态码为404，就重定向到404页面
    if (parseInt(ctx.status) === 404) {
        //ctx.body 就是ctx.response.body的简写
        ctx.response.redirect('/404')
    }
})

app.use(cors()) //要写在路由之前
app.use(bodyParser())   //要写在路由之前

app.use(router.routes(), router.allowedMethods())

app.use(static(path.join(__dirname,'static')))   //要写在路由后面，当静态资源和路由相同时，优先匹配路由
//只要读取静态资源直接进入static目录
//在页面中读取404.jpg  http://localhost:9000/images/404.jpg

app.listen(9000, () => {
    console.log(`Server is running at ${host}:${port}`);
})