const Router = require('koa-router')
const moment = require('moment')

const router = new Router()

const list = require('./list')
const add = require('./add')
const del = require('./del')
const edit = require('./edit')
const search = require('./search')
const { queryFn } = require('../../../utils')


router.use('/list',list.routes(),list.allowedMethods())
router.use('/add',add.routes(),add.allowedMethods())
router.use('/del',del.routes(),del.allowedMethods())
router.use('/edit',edit.routes(),edit.allowedMethods())
router.use('/search',search.routes(),search.allowedMethods())



module.exports = router