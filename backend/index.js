const express = require('express')
const consign = require('consign')
const db = require('./configs/db')

const app = express()
app.disable('x-powered-by')

app.db = db

const port = 3000;

consign()
    .include('./configs/passport.js')
    .then('./configs/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./configs/routes.js')
    .into(app)

app.listen(port, () => {
    console.log(`Servidor backend executando na porta ${port}`)
})