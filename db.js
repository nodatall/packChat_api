const pgp = require('pg-promise')()

const db = pgp({
  host: 'localhost',
  port: '5432',
  database: 'packchat'
})

const addParent = function (data) {
  console.log('adding parent', data)
  return db.query('INSERT INTO parent (email, first_name, last_name, password, picture_url) VALUES ($1, $2, $3, $4, $5)', [data.email, data.first_name, data.last_name, data.password, data.picture_url])
  .catch(error => console.log('error:', error))
}

const createPack = function (data) {
  return db.query('INSERT INTO pack (name, description, creator_id) VALUES ($1, $2, $3)', [data.name, data.description, data.creator_id])
  .catch(error => console.log('error:', error))
}

module.exports = {addParent}
