'use strict'

var qrcodes = [
  {
    name: '短线宝',
    price: '9800'
  },
  {
    name: '短线宝',
    price: '3300'
  },
  {
    name: '君银操盘',
    price: '10800'
  },
  {
    name: '君银操盘',
    price: '26800'
  },
  {
    name: '君银投顾',
    price: '300'
  },
  {
    name: '君银投顾',
    price: '800'
  },
  {
    name: '君银投顾',
    price: '3000'
  },

  {
    name: '君银投顾',
    price: '3500'
  },
  {
    name: '君银投顾',
    price: '6800'
  },
  {
    name: '君银投顾',
    price: '23500'
  },
  {
    over: true
  }
]
    , pres = [
  'http://www.jyzqsh.com/',
  'http://mp.jyzqwh.com/'
]
    , pages = [
  'BackendMan/WeiXinQRCode/ProductsAdd.aspx',
  'BackendMan/Alipay/ProductsAdd.aspx'
]
    , channel
    , url
    , pre = '1'
    , page = '0'
    , Repromise = []
    , WebPage = require('webpage')
    , system = require('system')
if (system.args.length === 1) {
  console.log('Try to pass some args when invoking this script!');
} else {
  console.log(system.args)
  channel = system.args[1]
  pre = system.args[2]||pre
  page = system.args[3]||page

}

if (pre === '0') {
  phantom.addCookie({
    'name': 'UserIDBackend', /* required property */
    'value': '1', /* required property */
    'domain': 'www.jyzqsh.com',
    'path': '/', /* required property */
    // 'httponly' : true,
    // 'secure'   : false,
    'expires': (new Date()).getTime() + (1000 * 60 * 60)   /* <-- expires in 1 hour */
  })
}

url = pres[pre] + pages[page]

qrcodes.forEach(function (qrcode, index) {
  Repromise.push(WebPage.create())
  Repromise[index].settings.userAgent = "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
  Repromise[index].open(url, function (state) {
    console.log('@@@@@@@@@@Open page ' + index + '@@@@@@@@@@: ', state)
    setTimeout(function () {
      console.log('The ' + index + ' is going')
      if (qrcode.over) {
        phantom.exit()
      }
      else {
        Repromise[index].evaluate(function (qrcode, channel) {
          $("#txtProductName").val(qrcode.name)
          $("#txtProductPrice").val(qrcode.price)
          $("#txtChannel").val(channel)
          // $("#btnAdd").click()
        }, qrcode, channel)
        Repromise[index].render('scanner/img' + index + '.jpg')
      }
    }, 5000 * (index + 1))
  })
})