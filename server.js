const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const db = require('./db')


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(request, response) {
  response.send('hello there')
})

app.post('/addParent', function(request, response) {
  db.addParent(request.body)
})

app.post('/addPack', function(request, response) {
  db.addPack(request.body)
})

app.post('/joinSaviorToCrisis', function(request, response) {
  db.joinSaviortoCrisis(request.body)
})

server.listen(3002, function () {
  console.log('-:: Listening on port 3002 ::-')
})
