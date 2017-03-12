const pgp = require('pg-promise')()

const db = pgp({
  host: 'localhost',
  port: '5432',
  database: 'packchat'
})

const addParent = function (data) {
  console.log('adding parent', data)
  db.query('INSERT INTO parents (email, first_name, last_name, password, picture_url) VALUES ($1, $2, $3, $4, $5)', [data.email, data.first_name, data.last_name, data.password, data.picture_url])
  .catch(error => console.log('error:', error))
}


const addChild = function (data) {
  console.log('adding child', data)
  db.query('INSERT INTO children (parent_id, first_name, picture_url) VALUES ($1, $2, $3 )', [data.parent_id, data.first_name, data.picture_url])
  .catch(error => console.log('error:', error))
}

const createPack = function (data) {
  console.log('creating child', data)
  db.query('INSERT INTO pack ( name, description, creator_id) VALUES ($1, $2, $3)', [data.name, data.description, data.creator_id])
  .catch(error => console.log('error:', error))
}

const createEvent = function (data) {
  console.log('creating event', data)
  db.query('INSERT INTO events (pack_id, event_time, name) VALUES ($1, $2, $3)', [data.pack_id, data.event_time, data.name])
  .catch(error => console.log('error:', error))
}

const createCrisis = function (data) {
  console.log('creating crisis', data)
  // 
  db.query('INSERT INTO crises (child_id, event_id,  name) VALUES ($1, $2, $3)', [data.child_id, data.event_id, data.name])
  .catch(error => console.log('error:', error))
}

const joinChildtoPack function (data) {
   console.log('join child to pack', data)
  db.query('INSERT INTO children_pack (child_id, pack_id) VALUES ($1, $2)', [data.child_id, data.child_pack ])
  .catch(error => console.log('error:', error))
}

const joinChildtoEvent function (data) {
   console.log('join child to event', data)
  db.query('INSERT INTO children_events (child_id, event_id) VALUES ($1, $2)', [data.child_id, data.event_id ])
  .catch(error => console.log('error:', error))
}

const joinSaviortoCrisis function (data) {
   console.log('join savior to crisis', data)
  db.query('UPDATE crises SET  savior_id = (savior_id) WHERE crisis_id = (crisis_id)', [data.savior_id, data.crisis_id])
  .catch(error => console.log('error:', error))
}

module.exports = {addParent}
