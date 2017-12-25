/* eslint-disable   */
var express = require('express')
var cheerio = require('cheerio')
var superagent = require('superagent')
var fs = require('fs')
var saveNewBook = require('./save-data').saveNewBook
var savePopularBook = require('./save-data').savePopularBook
var saveEBook = require('./save-data').saveEBook

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

module.exports = async function (res, saveUrl) {
	saveUrl = saveUrl || 'C:\\Users\\yeyq\\Desktop\\douban.json'
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
    // var reviews = getReviews($)
    saveNewBook(book1.subjects)
    savePopularBook(book2.subjects)
    saveEBook(book3.subjects)
    res.send(JSON.stringify(bookData))
    // writeFile(saveUrl, JSON.stringify(bookData))
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