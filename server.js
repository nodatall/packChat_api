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

app.post('/joinSaviorToCrisis', function(request, response) {
  db.joinSaviortoCrisis(request.body)
})

io.on('connection', function (clientSocket) {
  console.log('A client connected')

  connectedParents.push({
    parentId: 1,
    socket: clientSocket
  })

  clientSocket.on('login', function (data) {
    connectedParents.push({
      parentId: data.parentId,
      socket: clientSocket
    })
    socket.parentId = data.parentId
  })

  clientSocket.on('crisis', function (data) {

    console.log('in crises handler')
    console.log('data:', data)

    db.addCrisis({
      childId: data.childId,
      packId: data.packId,
      name: data.message
    })
    .then(crisisId => {
      getParentofChildofCrisis({crisis_id: crisisId})
      .then(distressedParentId => {
        db.getParentsByPack(data.packId)
        .then(parentIds => {
          parentIds.forEach(parentId => {
            getSocketByParentId(parentId.parent_id).emit('crisis', {message: data.message, packId: data.packid, parentId: distressedParentId})
          })
        })
        .catch(error => console.log('error in crisis handler:', error))
      })
    })
  })

  clientSocket.on('acceptChallenge', function (data) {
    db.joinSaviortoCrisis({
      crisisId: data.crisisId,
      saviorId: data.parentId
    })

    db.getParentofChildofCrisis({
      crisisId: data.crisisId
    })
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
  console.log('in getSocketByParentId, parentId:', parentId)
  console.log('connectedParents', connectedParents)
  return connectedParents.find(parent => parent.parentId == parentId).socket
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
