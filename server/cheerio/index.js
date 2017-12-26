/* eslint-disable   */
var express = require('express')
var cheerio = require('cheerio')
var superagent = require('superagent')
var fs = require('fs')
var getHotNews = require('./hot-new')
var getReadingContent = require('./reading-content')

var app = express()
var saveUrl = 'C:\\Users\\yeyq\\Desktop\\douban.json'

app.get('/', function (req, res, next) {
  // getReadingContent(res, saveUrl)
  getHotNews(res, saveUrl)
})

app.listen(3000, function () {
  console.log('app is listening at port 3000')
})