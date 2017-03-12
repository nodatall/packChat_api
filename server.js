const express = require('express')
const bodyParser = require('body-parser')
const db = require('db.js')

const app = express()

app.use(bodyParser.urlencoded({extended: true})

app.get('/', function(request, response) {
  response.send('hello there')
})

app.post('/addParent', function(request, response) {
  db.addParent(request.body)
})

app.post('/addPack', function(request, response) {
  db.addPack(request.body)
})

app.listen(3002, function () {
  console.log('-:: Listening on port 3002 ::-')
})
