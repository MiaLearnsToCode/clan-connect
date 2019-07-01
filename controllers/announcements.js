const Announcement = require('../models/announcement')
// note that commentSchema is imported with the announcement as it is embedded. there's no comment model

// create
function create(req, res) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .create(req.body)
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) return res.status(401).json({ message: 'Unauthorized'})
      return res.status(201).json(announcement)
    })
    .catch(err => res.status(422).json(err))
}

// index
function index(req, res) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .find()
    .populate('user')
    .populate('user.family')
    .populate('comments.user')
    .then(announcements => {
      if (!announcements) return res.status(404).json({ message: 'Announcements not found'})
      const newAnnouncements = announcements.filter(announcement => announcement.family.equals(req.currentFamily) )
      return res.status(200).json(newAnnouncements)
    })
    .catch(err => res.status(404).json(err))
}

// show
function show(req, res) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) return res.status(401).json({ message: 'Unauthorized'})
      if (!announcement) return res.status(404).json({ message: 'Announcement not found'})
      return res.status(200).json(announcement)
    })
    .catch(err => res.status(404).json(err))
}

// update
function update(req, res) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) return res.status(401).json({ message: 'Unauthorized'})
      if (!announcement.user.equals(req.currentUser)) return res.status(401).json({ message: 'Unauthorized'})
      if (!announcement) return res.status(404).json({ message: 'Announcement not found'})
      Object.assign(announcement, req.body)
      return announcement.save()
    })
    .then(announcement => res.status(202).json(announcement))
    .catch(err => res.status(422).json(err))
}

// destroy
function destroy(req, res){
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.user.equals(req.currentUser)) return res.status(401).json({ message: 'Unauthorized u'})
      if (!announcement.family.equals(req.currentFamily)) return res.status(401).json({ message: 'Unauthorized'})
      if (!announcement) return res.status(404).json({ message: 'Announcement not found'})
      return announcement.remove()
    })
    .then(() => res.status(200).json({message: 'Announcement was deleted successfully'}))
    .catch(err => res.status(422).json(err))
}

// COMMENTS:
// Create
function createComment(req, res) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) return res.status(401).json({ message: 'Unauthorized'})
      if (!announcement) return res.status(404).json({ message: 'Announcement not found'})
      announcement.comments.push(req.body)
      return announcement.save()
    })
    .then(announcement => res.status(200).json(announcement))
    .catch(err => res.status(422).json(err))
}

// Delete: very similar to create but you remove the comment instead of push it (plus need to identify the comment using its id)
function deleteComment(req, res) {
  req.body.family = req.currentFamily
  req.body.user = req.currentUser
  Announcement
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(announcement => {
      if (!announcement.family.equals(req.currentFamily)) return res.status(401).json({ message: 'Unauthorized'})
      if (!announcement.user.equals(req.currentUser)) return res.status(401).json({ message: 'Unauthorized'})
      if (!announcement) return res.status(404).json({ message: 'announcement not found'})
      const comment = announcement.comments.id(req.params.commentId)
      comment.remove()
      return announcement.save()
    })
    .then(() => res.status(200).json({message: 'Comment was deleted successfully'}))
    .catch(err => res.status(422).json(err))
}

module.exports = { create, index, show, update, destroy, createComment, deleteComment}
