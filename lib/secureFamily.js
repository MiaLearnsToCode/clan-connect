const Family = require('../models/family')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function secureFamily(req, res, next) {
  if (!req.headers.authorization) throw new Error('Unauthorized')
  const token = req.headers.authorization.slice(7)

  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
    .then(payload => Family.findById(payload.family))
    .then(family => {
      if (!family) throw new Error('Unauthorized')
      req.currentFamily = family
      next()
    })
    .catch(next)
}

module.exports =  secureFamily
