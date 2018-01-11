'use strict'

let crab = document.getElementById('crab')
crab.addEventListener('click',function(e){
  console.log(this)
  let span = this.querySelector('span')
  let input = this.querySelector('input')
  let pre=document.getElementById('pre').value
  let page=document.getElementById('page').value
  if(e.target.nodeName === 'BUTTON'){
    let url = `/crab?channel=${input.value}&page=${page}&pre=${pre}`
    span.innerHTML = 'Loading'
    fetch(url)
        .then(res=>res.text())
        .then(text=>{
          span.innerHTML=text
        })
  }
})

let qrcode = document.getElementById('qrcode')
qrcode.addEventListener('click',function(e){
  console.log(this)
  let span = this.querySelector('span')
  let input = this.querySelector('input')
  let pre=document.getElementById('pre').value
  let page=document.getElementById('page').value
  if(e.target.nodeName === 'BUTTON'){
    let url = `/qrcode?channel=${input.value}&page=${page}&pre=${pre}`
    span.innerHTML = 'Loading'
    fetch(url)
        .then(res=>res.text())
        .then(text=>{
          span.innerHTML=text
        })
  }
})