const express = require('express')
const db = require('db.js')

const app = express()

app.get('/', function(request, response) {
  response.send('hello there')
})

app.post('/addParent', function(request, response) {
  db.addParent(request.body)
})

app.listen(3002, function () {
  console.log('-:: Listening on port 3002 ::-')
})
