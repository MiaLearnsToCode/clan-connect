const router = require('express').Router()
const announcements = require('../controllers/announcements')
const users = require('../controllers/users')
const families = require('../controllers/families')
const secureUser = require('../lib/secureUser')
const secureFamily = require('../lib/secureFamily')

router.route('/families/:familyId/announcements/:id/comments')
  .post(secureFamily, secureUser, announcements.createComment)

router.route('/families/:familyId/announcements/:id/likes')
  .post(secureFamily, secureUser, announcements.createLike)

router.route('/families/:familyId/announcements/:id')
  .get(secureFamily, secureUser, announcements.show)
  .delete(secureFamily, secureUser, announcements.destroy)

router.route('/families/:familyId/announcements')
  .post(secureFamily, secureUser, announcements.create)
  .get(secureFamily, secureUser, announcements.index)

router.route('/families/:familyId/register')
  .post(secureFamily, users.registerUser)

router.route('/families/:familyId/login')
  .post(secureFamily, users.loginUser)

router.route('/families/:familyId')
  .get(families.showFamily)

router.route('/loginfamily')
  .post(families.loginFamily)

router.route('/registerfamily')
  .post(families.registerFamily)

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Wrong URL for the API' }))

module.exports = router
