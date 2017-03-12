const pgp = require('pg-promise')()

const db = pgp({
  host: 'localhost',
  port: '5432',
  database: 'packchat'
})

const addParent = function (data) {
  console.log('adding parent', data)

  return db.query('INSERT INTO parents (email, first_name, last_name, password, picture_url) VALUES ($1, $2, $3, $4, $5)', [data.email, data.first_name, data.last_name, data.password, data.picture_url])
  .catch(error => console.log('error:', error))
}


const addChild = function (data) {
  console.log('adding child', data)
  return db.query('INSERT INTO children (parent_id, first_name, picture_url) VALUES ($1, $2, $3 )', [data.parent_id, data.first_name, data.picture_url])
  .catch(error => console.log('error:', error))
}

const addPack = function (data) {
  console.log('creating child', data)
  return db.query('INSERT INTO pack ( name, description, creator_id) VALUES ($1, $2, $3)', [data.name, data.description, data.creator_id])
  .catch(error => console.log('error:', error))
}

const addEvent = function (data) {
  console.log('creating event', data)
  return db.query('INSERT INTO events (pack_id, event_time, name) VALUES ($1, $2, $3)', [data.pack_id, data.event_time, data.name])
  .catch(error => console.log('error:', error))
}

const addCrisis = function (data) {
  console.log('creating crisis', data)
  // 
  return db.query('INSERT INTO crises (child_id, event_id,  name) VALUES ($1, $2, $3)', [data.child_id, data.event_id, data.name])
  .catch(error => console.log('error:', error))
}

const joinChildtoPack = function (data) {
   console.log('join child to pack', data)
  return db.query('INSERT INTO children_pack (child_id, pack_id) VALUES ($1, $2)', [data.child_id, data.child_pack ])
  .catch(error => console.log('error:', error))
}

const joinChildtoEvent = function (data) {
   console.log('join child to event', data)
  return db.query('INSERT INTO children_events (child_id, event_id) VALUES ($1, $2)', [data.child_id, data.event_id])
  .catch(error => console.log('error:', error))
}

const getParentofChildofCrisis = function (data) {
  return db.task(t => {
   return  t.one("SELECT child_id FROM crises WHERE id = $1", data. crisis_id)
      .then(crisis => {
        return t.one("SELECT parent_id FROM children where id = $1",crisis.child_id)
          .then(child => {
                      return child.parent_id
                    })
          .catch(error => console.log('error:', error))
      })
      .catch(error => console.log('error:', error))
  })
}

const joinSaviortoCrisis = function (data) {
   console.log('join savior to crisis', data)
  return db.one('UPDATE crises SET  savior_id = $1 WHERE crisis_id = $2', [data.savior_id, data.crisis_id])
  .catch(error => console.log('error:', error))
}

module.exports = {addParent, addChild, addPack, addEvent, joinChildtoPack, joinChildtoEvent, joinSaviortoCrisis, getParentofCrisis}
