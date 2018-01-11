'use strict'

var WebPage = require('webpage')
var page = WebPage.create()
page.open('http://mp.jyzqwh.com/BackendMan/WeiXinQRCode/ProductsAdd.aspx',function(state){
  console.log('This is just a @@@@@@@@@@@@@@@@@@@@',state)
  setTimeout(function () {
    page.evaluate(function () {
      $("#txtProductName").val("测试1")
      $("#txtProductPrice").val("1")
      $("#txtChannel").val("测试1")
    })
    page.render("hao.png")
    phantom.exit()
  },2000)
})