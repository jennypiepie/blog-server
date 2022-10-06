const Router = require('koa-router')
const multer = require('@koa/multer')

const router = new Router()

const path = require('path')
const { returnMsg, queryFn, jwtVerify} = require('../../utils')

//存储文件名称
let myFileName = ''

const storage = multer.diskStorage({
    destination: path.join(__dirname, "upload/"),   //图片存放位置
    filename: (req, file, cb) => {
        myFileName = `${file.fieldname}-${Date.now().toString(16)}.${file.originalname.split('.').splice(-1)}`
        cb(null,myFileName)
    }
})

//限制大小
const limits = {
    fieldSize: 1024 * 200,  //200kb
    fields: 1,  //一个字段
    files: 1    //一个文件
}

let upload = multer({ storage, limits })

router.post('/', upload.single('avatar'), async ctx => {
    let token = ctx.request.headers['blog-token']
    //鉴权
    if (!jwtVerify(token)) {
        ctx.body = returnMsg(2, 'token过期', 'token过期')
        return
    }
    //修改token对应的avatar
    let sql = `UPDATE user SET avatar='${myFileName}' WHERE token='${token}'`
    await queryFn(sql)

    //重新查询并返回
    let sql1 = `SELECT username,avatar FROM user WHERE token='${token}'`
    let result = await queryFn(sql1)

    ctx.body = returnMsg(0, '修改成功',result[0])
})



module.exports = router