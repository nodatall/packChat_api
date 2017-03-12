const pgp = require('pg-promise')()

const db = pgp('localhost:5432/packhat')

const addParent = function (data) {
  db.query('INSERT INTO parent (email, first_name, last_name, password, picture_url) VALUES ($1, $2, $3, $4, $5)', [data.email, data.first_name, data.last_name, data.password, data.picture_url])
}

const createPack = function (data) {
  db.query('INSERT INTO pack (name, description, creator_id) VALUES ($1, $2, $3)', [data.name, data.description, data.creator_id])
}

module.exports = {addParent}
