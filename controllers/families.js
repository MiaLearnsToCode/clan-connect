const Family = require('../models/family')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


// register: simple post request to create a new user object
function registerFamily(req, res,next) {
  Family
    .create(req.body)
    .then(family => res.status(201).json({ message: `You created the ${family.family} family` }))
    .catch(next)
}

function loginFamily(req, res,next) {
  Family
    .findOne({ family: req.body.family })
    .then(family => {
      if (!family) throw new Error('Not Found')
      const token = jwt.sign({ family: family._id }, secret, { expiresIn: '5h' })
      res.status(200).json({ family, token })
    })
    .catch(next)
}

function showFamily(req,res,next) {
  Family
    .findById(req.params.familyId)
    .then(family => {
      if (!family) throw new Error('Not Found')
      return res.status(200).json(family)
    })
    .catch(next)
}


module.exports = { registerFamily, loginFamily, showFamily }
