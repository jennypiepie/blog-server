const Router = require('koa-router')

const router = new Router()

const list = require('./list')
// const add = require('./add')
// const delete = require('./delete')
const edit = require('./edit')
const search = require('./search')


router.use('/list',list.routes(),list.allowedMethods())
// router.use('/add',add.routes(),add.allowedMethods())
// router.use('/delete',delete.routes(),delete.allowedMethods())
router.use('/edit',edit.routes(),edit.allowedMethods())
router.use('/search',search.routes(),search.allowedMethods())



module.exports = router