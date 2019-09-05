const Announcement = require('../models/announcement')

// create
function create(req, res, next) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .create(req.body)
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) throw new Error('Unauthorized')
      return res.status(201).json(announcement)
    })
    .catch(next)
}

// index
function index(req, res, next) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .find()
    .populate('user')
    .populate('user.family')
    .populate('comments.user')
    .then(announcements => {
      if (!announcements) throw new Error('Not Found')
      const newAnnouncements = announcements.filter(announcement => announcement.family.equals(req.currentFamily) )
      return res.status(200).json(newAnnouncements)
    })
    .catch(next)
}

// show
function show(req, res, next) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) throw new Error('Unauthorized')
      if (!announcement) throw new Error('Not Found')
      return res.status(200).json(announcement)
    })
    .catch(next)
}

// destroy
function destroy(req, res, next){
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.user.equals(req.currentUser)) throw new Error('Unauthorized')
      if (!announcement.family.equals(req.currentFamily)) throw new Error('Unauthorized')
      if (!announcement) throw new Error('Not Found')
      return announcement.remove()
    })
    .then(() => res.status(200).json({ message: 'Announcement was deleted successfully' }))
    .catch(next)
}

// COMMENTS:
// Create
function createComment(req, res, next) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) throw new Error('Unauthorized')
      if (!announcement) throw new Error('Not Found')
      announcement.comments.push(req.body)
      return announcement.save()
    })
    .then(announcement => res.status(200).json(announcement))
    .catch(next)
}

function createLike(req, res, next) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      announcement.comments.map(comment => {
        if (!comment) throw new Error('Not Found')
        if (!comment.family.equals(req.currentFamily)) throw new Error('Unauthorized')
        if (comment.likes.some(like => like.user._id.equals(req.currentUser._id))) return comment
        if (comment._id.equals(req.body._id)) return comment.likes.push({ user: req.currentUser })
      })
      return announcement.save()
    })
    .then(comment => res.status(200).json(comment))
    .catch(next)
}

module.exports = { create, index, show, destroy, createComment, createLike }
