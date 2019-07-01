const Family = require('../models/family')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


// register: simple post request to create a new user object
function registerFamily(req, res) {
  Family
    .create(req.body)
    .then(family => res.status(201).json({ message: `You created the ${family.family} family`}))
    .catch(err => res.status(422).json(err))
}

function loginFamily(req, res) {
  Family
    .findOne({ family: req.body.family})
    .then(family => {
      if (!family) return res.status(404).json({ message: 'Family does not exist'})
      const token = jwt.sign({ family: family._id }, secret, { expiresIn: '5h'})
      res.status(200).json({ family, token })
    })
    .catch(err => res.status(401).json(err))
}

function indexFamilies(req,res) {
  Family
    .find()
    .then(families => {
      if (!families) return res.status(404).json({ message: 'Families not found'})
      return res.status(200).json(families)
    })
    .catch(err => res.status(404).json(err))
}

function showFamily(req,res) {
  Family
    .findById(req.params.familyId)
    .then(family => {
      if (!family) return res.status(404).json({ message: 'Families not found'})
      return res.status(200).json(family)
    })
    .catch(err => res.status(404).json(err))
}


module.exports = { registerFamily, loginFamily, indexFamilies, showFamily }
