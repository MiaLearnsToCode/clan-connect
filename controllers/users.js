const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


function registerUser(req, res) {
  req.body.family = req.currentFamily
  User
    .create(req.body)
    .then(user => {
      if (!user.family.equals(req.currentFamily._id)) return res.status(401).json({ message: 'Unauthorized'})
      return res.status(201).json(user)
    })
    .catch(err => res.status(422).json(err))
}

function loginUser(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      console.log(user.family)
      if (!user.family.equals(req.params.familyId)) return res.status(401).json({ message: 'Unauthorized'})
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized credentials'})
      }
      const token = jwt.sign({ user: user._id, family: user.family}, secret, { expiresIn: '5h'})
      res.status(200).json({ message: `Welcome back ${user.username}`, token })
    })
    .catch(err => res.status(401).json(err))

}

module.exports = { registerUser, loginUser }
