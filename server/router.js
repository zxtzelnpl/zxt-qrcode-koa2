'use strict'

const path = require('path')
const Router = require('koa-router')
const {wechatString,alipayString} = require('./libs/query-strings')
const router = new Router()
const util = require('./libs/util')
const request = require('request')
const fs = require('fs')
const phantomjs = require('phantomjs-prebuilt')

router.get('/', async (ctx) => {
  try {
    let data = await util.readFileAsync(path.join(__dirname, '../src/index.html'))
    ctx.type = 'html'
    ctx.body = data
  }
  catch (err) {
    ctx.body = {message: err.message}
    ctx.status = err.status || 500
  }
})
router.get('/crab', async (ctx) => {
  let {channel,pre,page} = ctx.query
  console.log(ctx.query)
  let data = await crab(channel,pre,page)
  ctx.body = data
})
router.get('/qrcode',async (ctx)=>{
  let {channel,pre='1',page='0'}= ctx.query
      , pres=['http://jyzqsh.com/','http://mp.jyzqwh.com/']
      , names=['微信','支付宝',"支付宝"]
      , queryStr
      , response
      , web
      , name
  web = pres[pre]
  name = names[page]
  //微信还是支付宝
  if(page==='0'){
    queryStr = wechatString(channel)
  }
  else{
    queryStr = alipayString(channel)
  }

  //上海还是武汉
  if(pre==='0'){
    response   = await query(ctx.shDB,queryStr)
  }
  else{
    response   = await query(ctx.whDB,queryStr)
  }
  if(response.length ===0){
    return ctx.body='没有此渠道'
  }
  else{
    let data = response.map(item=>{
      if(page==='0'){
        return {
          dir:item.ProductSummary,
          name:`${name}-${item.ProductSummary}-${item.ProductName}-${item.ProductPrice}.jpg`,
          url:`${web}${item.QRCodeImage}`
        }
      }
      else{
        return {
          dir:item.ProductSummary,
          name:`${name}-${item.ProductSummary}-${item.ProductName}-${item.Product_Money}.jpg`,
          url:`${web}${item.QRCodeImage}`
        }
      }

    })
    let dir = 'download/'+data[0].dir
    try{
      await util.mkDirAsync(dir)
    }
    catch(err){
      if(err.code!=='EEXIST'){
        ctx.body = err.message
        ctx.status = err.status || 500
      }
    }
    let promises = data.map(item=>download(item.url,item.dir,item.name))
    return Promise
        .all(promises)
        .then(()=>{
          ctx.body = channel+'已经全部下载完成'
        })
        .catch(err=>{
          ctx.body = err.message
          ctx.status = err.status || 500
        })
  }

})
router.get('/test',ctx=>{
  setTimeout(()=>{
    ctx.body='zxt1'
  },2000)
  ctx.body='zxt2'
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('zxt')
    },5000)
  })
      .then(res=>{
        ctx.body=res
      })


})

function query (connection, str) {
  return new Promise((resolve, reject) => {
    connection.query(str, (error, results, fields) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}
async function download(url, dir, filename){
  await request.head(url)
  return request(url).pipe(fs.createWriteStream('download/'+dir + "/" + filename));
}
function crab(channel,pre,page){
  return new Promise((resolve,reject)=>{
    const program = phantomjs.exec('./phantomjs/two.js', channel,pre,page)
    program.stdout.pipe(process.stdout)
    program.stderr.pipe(process.stderr)
    program.on('exit', code => {
      resolve(code)
      console.log('The program is exit')
    })
  })
}


module.exports = router