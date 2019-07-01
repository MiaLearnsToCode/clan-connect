const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  family: {
    type: mongoose.Schema.ObjectId,
    ref: 'Family'
  }
})
const announcementSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  family: {
    type: mongoose.Schema.ObjectId,
    ref: 'Family'
  }
}, {
  timestamps: true
})

announcementSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Announcement', announcementSchema)
