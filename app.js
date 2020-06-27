const http = require('http')
const fs = require('fs')
const template = require('art-template')
const url = require('url')

const comments = [
  {
    name: '张三',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张4',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张5',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张6',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张7',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张8',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  }
]


http.createServer(function (req,res) {
  const parseObj = url.parse(req.url , true)

  const pathname = parseObj.pathname

  if( pathname === '/' || pathname === '/index'){
    fs.readFile('./views/index.html',function (err,data) {
      if (err) {
        return res.end('404 not found')
      }
      let htmlStr = template.render(data.toString(),{
        comments
      })
      res.end(htmlStr)
    })
  } else if (pathname === '/post' ) {
    fs.readFile('./views/post.html',function (err, data) {
      if (err) {
        return res.end('404 not found')
      }
      res.end(data)
    })
  } else if (pathname === '/pinglun' ) {
    const comment = parseObj.query
    comment.dateTime = new Date()
    comments.unshift(comment)


    res.statusCode = 302
    res.setHeader('Location','/')
    res.end()
  }else if (pathname.indexOf('/public/') === 0) {
    fs.readFile('.' + pathname,function (err, data) {
      if (err) {
        return res.end('404 not found')
      }
      res.end(data)
    })
  } else {
    fs.readFile('./views/404.html',function (err , data) {
      if (err) {
        return res.end('404 not found')
      }
      res.end(data)
    })
  }


})
.listen(3000,function () {
  console.log('running')
})