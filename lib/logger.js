function logger(req, res, next) {
  console.log(`${req.method} request made to the url ${req.url}`)
  next()
}

module.exports = logger
