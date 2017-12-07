/* eslint-disable   */
var express = require('express')
var cheerio = require('cheerio')
var superagent = require('superagent')
var fs = require('fs')

var app = express()
var saveUrl = 'E:\\douban\\data.json'

app.get('/', function (req, res, next) {
  getReadingContent(res)
  // getHotNews(res)
})

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
function getReadingContent (res) {
  var bookData = []
  superagent.get('https://book.douban.com/')
  .end(function (err, sres) {
    if (err) {
      return next(err)
    }
    var $ = cheerio.load(sres.text)
    var book1 = getBookList('.books-express', $)
    var book2 = getBookList('.popular-books', $)
    var book3 = getBookList('.ebook-area', $)
    var reviews = getReviews($)
    bookData.push(book1)
    bookData.push(book2)
    bookData.push(book3)
    bookData.push(reviews)
    res.send(JSON.stringify(bookData))
    writeFile(saveUrl, JSON.stringify(bookData))
  })
  function getBookList (className,$) {
    var itemsData = {}
    $(className).each(function (idx, element) {
      var $el = cheerio.load(element)
      var books = []
      var book = {}
      var lis = $(this).find('ul li').each(function(i, elem) {
        book = {
          images: {
            medium: $(this).find('.cover a img').attr('src')
          },
          title: $(this).find('.title a').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, ""),
          rating: {
            average: $(this).find('.info .average-rating').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, ""),
            stars: $(this).find('.info .average-rating').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "") / 2 * 10
          },
          author: $(this).find('.info .author:first-child').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, ""),
          classification: $(this).find('.info .book-list-classification').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, ""),
          reviews: $(this).find('.info .reviews').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "").split('(')[0],
          reviewer: $(this).find('.info .reviews a').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, ""),
          price: $(this).find('.info .price').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "").split('元')[0].replace(/[^\d+(\.\d+)?$]/g,"")
        }
        books.push(book)
      })
      itemsData['title'] = $(this).find('h2 span:first-child').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "")
      itemsData['subjects'] = books
    })
    return itemsData
  }

  function getReviews ($) {
    var className = '#reviews'
    var reviews = {}
    var book = {}
    var books = []
    var topTitle = $(className).find('.reviews-hd h2').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "").slice(0,7)
    $(className).find('.reviews-bd .review').each(function (i,elem) {
      var images = $(this).find('.review-hd>a>img').attr('data-original')
      var introduction = $(this).find('h3 a ').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "")
      var user = $(this).find('.review-meta a:first-child').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "")
      var bookName = $(this).find('.review-meta a:nth-child(2)').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "")
			var content = $(this).find('.review-content').text().replace(/[\r\n]|[(^\s*)|(\s*$)]/g, "").split('全')[0]
			var 
      book = {
        images,
        introduction,
        user,
        bookName,
        content
      }
      books.push(book)
    })
    reviews['title'] = topTitle
    reviews['subjects'] = books
    return reviews
  }
}
async function getHotNews (res) {
  var html = await requestURL('https://www.douban.com/explore/')
  var $ = cheerio.load(html)
  var article = await getArticle($)
  res.send(article)
  writeFile(saveUrl, JSON.stringify(article))
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

app.listen(3000, function () {
  console.log('app is listening at port 3000')
})