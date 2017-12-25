/* eslint-disable   */
var express = require('express')
var cheerio = require('cheerio')
var superagent = require('superagent')
var fs = require('fs')
var saveHot = require('./save-data').saveHot

module.exports = async function (res, saveUrl) {
	saveUrl = saveUrl || 'C:\\Users\\yeyq\\Desktop\\douban.json'
  var html = await requestURL('https://www.douban.com/explore/')
  var $ = cheerio.load(html)
  var article = await getArticle($)
  res.send(article)
  // 保存数据到数据库
  saveHot(article.subjects)
  // writeFile(saveUrl, JSON.stringify(article))
}

async function getArticle ($) {
  console.log('正在爬Article部分')
  var that = this
  var article = {}
  var items = []
  var count = 0
  var topTitle = $('.article .h1').text().replace(/\s/g, "")
  var articleItems = $('.article #gallery_main_frame .item')
  console.log('items', articleItems.length)
  for (let i = 0; i < 6; i++) {
    var itemContent = {}
    var detailContent = {}
    var item = articleItems[i]
    var userPic = $(item).find('.hd .usr-pic a:first-child img').attr('src')
    var userName = $(item).find('.hd .usr-pic a:nth-child(2)').text().replace(/\s/g, "")
    var pic = $(item).find('.bd .pic a').attr('background-image')
    var title = $(item).find('.bd .content .title a:first-child').text().replace(/\s/g, "")
    var review = $(item).find('.bd .content p a').text().replace(/\s/g, "")
    var detailUrl = $(item).find('.bd .content p a').attr('href')
    if (typeof detailUrl !== 'undefined') {
      try {
        detailContent = await getUrlDetail(detailUrl)
      } catch (err) {
        console.log(`抓取${detailUrl}详情页失败`)
      }
      itemContent = {
        userPic,
        userName,
        pic,
        title,
        review,
        detailUrl,
        detailContent
      }
      items.push(itemContent)
    }
  }
  article['title'] = topTitle
  article['subjects'] = items
  return article
}

async function getUrlDetail (detailUrl) {
  console.log(`正在爬${detailUrl}的数据`)
  var detailContent = {}
  var reg = /\d{9,}/g
  var number = detailUrl.match(reg)
  console.log(number)
  var detailhtml = await requestURL(detailUrl)
  var $el = cheerio.load(detailhtml)
  var introduction = $el('.article .note-container  .introduction p').text().replace(/\s/g, "")
  var pArray = []
  var imgs = []
  $el(`.article .note-container #note_${number}_full .note p`).each(function (i, elem) {
    var p = $el(this).text().replace(/\s/g, "")
    pArray.push(p)
  })
  $el(`.article .note-container #note_${number}_full .note img`).each(function (i, elem) {
    var img = $el(this).attr('src')
    imgs.push(img)
  })
  detailContent = {
    introduction,
    pArray,
    imgs
  }
  return detailContent
}

function writeFile(file, data){
  // appendFile，如果文件不存在，会自动创建新文件  
  // 如果用writeFile，那么会删除旧文件，直接写新文件   
  fs.appendFile(file, data, function(err){
    if (err) {
      console.log("fail " + err)
    } else {
      console.log("写入文件ok")
    }
  })
}

function requestURL(url) {
  var promise = new Promise((resolve, reject) => {
    superagent.get(url).end(function (err, sres) {
      if (err) {
        reject(err)
      }
      resolve(sres.text)
    })
  })
  return promise
}