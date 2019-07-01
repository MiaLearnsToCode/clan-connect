const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  family: {
    type: mongoose.Schema.ObjectId,
    ref: 'Family'
  }

})

// function stops the json from sending the user password and their email as a response
userSchema
  .set('toJSON', {
    transform(doc, json) {
      delete json.password
      delete json.email
      return json
    }
  })

// Create the virtual password confirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// before the validation happens (pre-validation), check if the password and the virtual passwordConfirmation match
// if they do move on the the next function
userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'passwords do not match')
    }
    next()
  })

// validation that the username and email are unique
userSchema.plugin(require('mongoose-unique-validator'))

// if the validation is all good, then before saving the password is encrypted. If successful move to the next
userSchema
  .pre('save', function excryptPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

// function that checks if the password typed by the user at login matches the one saved in the database. this check is done by encrypting the password typed in the same way as the one saved and then comparing them
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
