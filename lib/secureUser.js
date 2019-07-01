const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

//  Function firstly checks if the user has an authorization at all,
//  if it has one it extrapolates the token
// if the id in the saved in the sub matches one of an existing user then the user is allowed through the route

function secureUser(req, res, next) {
  if (!req.headers.authorization) throw new Error('Unauthorized')
  const token = req.headers.authorization.slice(7)

  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
    .then(payload => User.findById(payload.user))
    .then(user => {
      if (!user) throw new Error('Unauthorized')
      if (!user.family.equals(req.params.familyId)) throw new Error('Unauthorized')
      req.currentUser = user
      req.currentFamily = req.params.familyId
      next()
    })
    .catch(next)
}

module.exports =  secureUser
