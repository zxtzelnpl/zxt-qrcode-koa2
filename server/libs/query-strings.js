exports.wechatString = function (ProductSummary) {
  return `SELECT * FROM dbl_products WHERE ProductSummary='${ProductSummary}' ORDER BY id DESC;`
}
exports.alipayString = function (ProductSummary) {
  return `SELECT * FROM alipay_qrcode WHERE ProductSummary='${ProductSummary}' ORDER BY systemid DESC;`
}