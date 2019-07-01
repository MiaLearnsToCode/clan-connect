const mongoose = require('mongoose')

const familySchema = new mongoose.Schema({
  family: { type: String, required: true, unique: true}
})

familySchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('family', familySchema)
