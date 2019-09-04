const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


function registerUser(req, res, next) {
  req.body.family = req.currentFamily
  User
    .create(req.body)
    .then(user => {
      if (!user.family.equals(req.currentFamily._id)) throw new Error('Unauthorized')
      return res.status(201).json(user)
    })
    .catch(next)
}

function loginUser(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      console.log(user.family)
      if (!user.family.equals(req.params.familyId)) throw new Error('Unauthorized')
      if (!user || !user.validatePassword(req.body.password)) throw new Error('Unauthorized')
      const token = jwt.sign( { user: user._id, family: user.family }, secret, { expiresIn: '5h' } )
      res.status(200).json({ message: `Welcome back ${user.username}`, token })
    })
    .catch(next)

}

module.exports = { registerUser, loginUser }
