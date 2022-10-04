const mysql = require('mysql')
//开发环境host
let host = 'http://127.0.0.1'
//生产环境host
// let host = 'http://8.130.20.22'

//开发环境port
let port = 9000
//生产环境port
// let port= 80

//创建连接池
const pool = mysql.createPool({
    host: 'localhost',   //连接的服务器(代码托管到线上后需改为内网IP)
    port: 3306,  //mysql服务运行的端口
    database: 'my_blog',
    user: 'root',
    password:'mysqlmmbwl0314'
})

//对数据库进行增删改查的基础
const query = (sql, callback) => {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows)
            connection.release()
        })
    })
}

//返回信息的结果
//errCode :0 成功,1 参数错误,2 其他错误
//message:请求结果
//data:返回给前端的数据
const returnMsg = (errCode,message,data) => {
    return {
        errCode: errCode || 0,
        message: message || '',
        data: data || {}
    }
}

// 数据库操作的promise封装
const queryFn = (sql) => {
    return new Promise((resolve, reject) => {
        query(sql, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

module.exports = {
    host,port,query,returnMsg,queryFn
}