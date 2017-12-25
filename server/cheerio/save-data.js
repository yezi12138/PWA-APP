// 数据库定义
const db = require('../db')
const NewBook = db.NewBook
const Hot = db.Hot
const MovieComment = db.MovieComment
const EBook = db.EBook
const PopularBook = db.PopularBook

/**
 * 将爬虫的数据写入数据库
 */
function saveNewBook (data) {
  if (data && data.length !== 0) {
    data.map((item, index) => {
      let book = new NewBook({
        author: item.author,
        images: item.images,
        rating: item.rating,
        title: item.title
      })
      NewBook.find({title: book.title, author: book.author}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          if (data.length === 0) {
            book.save((err, data) => {
              if (err) {
                console.log(err)
              }
            })
          } else {
            console.log('exit this data')
          }
        }
      })
    })
  }
}

function saveEBook (data) {
  if (data && data.length !== 0) {
    data.map((item, index) => {
      let book = new EBook({
        author: item.author,
        images: item.images,
        rating: item.rating,
        price: item.price,
        title: item.title
      })
      NewBook.find({title: book.title, author: book.author}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          if (data.length === 0) {
            book.save((err, data) => {
              if (err) {
                console.log(err)
              }
            })
          } else {
            console.log('exit this data')
          }
        }
      })
    })
  }
}

function savePopularBook (data) {
  if (data && data.length !== 0) {
    data.map((item, index) => {
      let book = new PopularBook({
        images: item.images,
        classification: item.classification,
        rating: item.rating,
        reviewer: item.reviewer,
        reviews: item.reviews,
        title: item.title
      })
      NewBook.find({title: book.title, reviewer: book.reviewer}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          if (data.length === 0) {
            book.save((err, data) => {
              if (err) {
                console.log(err)
              }
            })
          } else {
            console.log('exit this data')
          }
        }
      })
    })
  }
}

function saveHot (data) {
  if (data && data.length !== 0) {
    data.map((item, index) => {
      let hot = new Hot({
        detailContent: item.detailContent,
        detailUrl: item.detailUrl,
        review: item.review,
        title: item.title,
        userName: item.userName,
        userPic: item.userPic
      })
      Hot.find({title: hot.title, userName: hot.userName}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          // 如果不存在则注册账号
          if (data.length === 0) {
            hot.save((err, data) => {
              if (err) {
                console.log(err)
              }
            })
          } else {
            console.log('exit this data')
          }
        }
      })
    })
  }
}

function saveComment (data) {
  if (data) {
    let comment = new MovieComment({
      userName: data.userName,
      stars: data.stars,
      value: data.value,
      time: data.time,
      like: data.like,
      id: data.id,
      childComment: [],
      avatar: data.avatar,
      only: data.only || false,
      tags: data.tags || []
    })
    MovieComment.find({userName: comment.userName}, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // 如果不存在则注册账号
        if (data.length === 0) {
          comment.save((err, data) => {
            if (err) {
              console.log(err)
            }
          })
        } else {
          // MovieComment.update({userName:comment.userName}, {'$push':{ childComment : comment}}, (err, data) => {
          //     if (err) {
          //         res.end(err)
          //     } else {
          //         console.log('push sucess')
          //     }
          // })
          console.log('exit this data')
        }
      }
    })
  }
}

module.exports = {
  saveNewBook,
  saveHot,
  saveComment,
  saveEBook,
  savePopularBook
}
