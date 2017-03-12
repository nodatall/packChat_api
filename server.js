const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const db = require('./db')


const connectedParents = []
  // [{ id: 1, socket: sldkjflk }, { id: 2, socket: lkjlkj }]

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

io.on('connection', function (clientSocket) {
  console.log('A client connected')

  clientSocket.on('login', function (data) {
    connectedParents.push({
      parentId: data.parentId,
      socket: clientSocket
    })
    socket.parentId = data.parentId
  })

  clientSocket.on('crisis', function (data) {
    db.getParentsByPack(data.packId)
    .then(parentIds => {
      parentIds.forEach(parentId => {
        getSocketByParentId(parentId).emit('crisis', data.message)
      })
    })
  })

  clientSocket.on('acceptChallenge', function (data) {
    db.addSaviorToCrisis(data.crisisId, data.parentId)

    db.getParentByCrisis(data.crisisId)
    .then(parentWithCrisisId => {
      getSocketByParentId(parentWithCrisisId)
      .emit('saviorFound', {saviorId: data.parentId})
    })

    sendAcceptMessageToPack({
      saviorId: data.parentId,
      crisisId: data.crisisId
    })
  })

  clientSocket.on('refuseChallenge', function (data) {
    sendRefuseMessageToPack({
      refuserId: data.parentId,
      crisisId: data.crisisId
    })
  })

})

function getSocketByParentId (parentId) {
  return connectedParents.find(parent => parent.id === parentId).socket
}

function sendAcceptMessageToPack(acceptMessageData) {
  db.getParentsByPack(acceptMessageData.packId)
  .then(parentIds => {
    parentIds.forEach(parentId => {
      sendAcceptMessageToParent(acceptMessageData, parentId)
    })
  })
}

function sendAcceptMessageToParent (acceptMessageData, parentId) {
  getSocketByParentId(parentId).emit('saviorFound', acceptMessageData)
}

function sendRefuseMessageToPack(refuseMessageData) {
  db.getParentsByPack(refuseMessageData.packId)
  .then(parentIds => {
    parentIds.forEach(parentId => {
      sendRefuseMessageToParent(refuseMessageData, parentId)
    })
  })
}

function sendRefuseMessageToParent (refuseMessageData, parentId) {
  getSocketByParentId(parentId).emit('refuse', refuseMessageData)
}

server.listen(3002, function () {
  console.log('-:: Listening on port 3002 ::-')
})
