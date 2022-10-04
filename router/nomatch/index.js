const Router = require('koa-router')
const router = new Router()

const mime = require('mime-types')  //读取文件类型

const fs = require('fs')
const path = require('path')

//404
router.get('/', async ctx => {
    let filePath = path.join(__dirname, '../../static/images/404.jpg')
    //同步读取文件
    let file = fs.readFileSync(filePath)
    //根据读取文件的类型设置content-type的类型
    let mimeTypes = mime.lookup(filePath)
    //设置设置content-type的类型
    ctx.set('content-type',mimeTypes)
    ctx.body = file
})

module.exports =router