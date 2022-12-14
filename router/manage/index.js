const Router = require('koa-router')

const router = new Router()

const login = require('./login')
const register = require('./register')
const article = require('./article')
const info = require('./info')
const upload = require('./upload')

router.post('/', async ctx => {
    ctx.body = '管理系统'
})

router.use('/login',login.routes(),login.allowedMethods())
router.use('/register',register.routes(),register.allowedMethods())
router.use('/article',article.routes(),article.allowedMethods())
router.use('/info', info.routes(), info.allowedMethods())
router.use('/upload',upload.routes(),upload.allowedMethods())

module.exports = router