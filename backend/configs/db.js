// Configurações de acesso ao banco de dados
const dbConfig = require('../knexfile.js')
const knex = require('knex')(dbConfig)

knex.migrate.latest([dbConfig])

module.exports = knex