'use strict'

const fs=require('fs');

exports.readFileAsync = function(fpath,encoding){
  return new Promise(function(resolve,reject){
    fs.readFile(fpath,encoding,function(err,content){
      if(err){reject(err)}
      else{ resolve(content)}
    })
  })
}

exports.writeFileAsync = function(fpath,content){
  return new Promise(function(resolve,reject){
    fs.writeFile(fpath,content,function(err){
      if(err){reject(err)}
      else{ resolve()}
    })
  })
}

exports.mkDirAsync = function(fpath){
  return new Promise(function(resolve,reject){
    fs.mkdir(fpath,err=>{
      err?reject(err):resolve()
    })
  })
}

exports.accessDirAsync = function(fpath){
  return new Promise(function(resolve,reject){
    fs.access(fpath,err=>{
      err?reject(err):resolve()
    })
  })
}

exports.rmDirAsync = function(fpath){
  return new Promise(function(resolve,reject){
    fs.rmdir(fpath,err=>{
      err?reject(err):resolve()
    })
  })
}