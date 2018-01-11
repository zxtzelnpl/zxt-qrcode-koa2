'use strict'

const path = require('path')
const Koa = require('koa')
const mysql = require('mysql')
const serve = require('koa-better-serve')
const favicon = require('koa-favicon')

/**引用router**/
const router = require('./server/router')

/**引用config**/
const mysqlConfig = require('./server/config/mysql')

/**定义常量**/
const port = process.env.PORT || 3000
const shDB = mysql.createConnection(mysqlConfig.sh)
const whDB = mysql.createConnection(mysqlConfig.wh)

/**生成app实例**/
const app = new Koa()
app.context.shDB = shDB
app.context.whDB = whDB

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(path.join(__dirname, './src'), '/src'))

app.listen(port, () => {
  console.log(`listen on ${port}`)
})






