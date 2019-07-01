const express = require('express')
const { port, dbURI } = require('./config/environment')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(dbURI, { useNewUrlParser: true }, () => console.log('Mongoose connected'))

app.use(express.static(`${__dirname}/dist`))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const logger = require('./lib/logger')
app.use(logger)

const router = require('./config/router')
app.use('/api', router)

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(port, () => console.log(`App is listening on ${port} port`))
