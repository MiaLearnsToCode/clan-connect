const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/clan-connect'
const secret = process.env.SECRET || 'family'

module.exports = { port, dbURI, secret }
