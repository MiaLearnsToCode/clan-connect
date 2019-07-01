const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const {dbURI} = require('../config/environment')

// require the models
const Family = require('../models/family')
const User = require('../models/user')
const Announcement = require('../models/announcement')

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
  if (err) console.log(err)
  db.dropDatabase()
    .then(() => {
      return Family.create([
        {
          family: 'firstfamily'
        },
        {
          family: 'secondfamily'
        }
      ])
    })
    .then(families => {
      console.log(`${families.length} families created`)
      return User.create([
        {
          username: 'mum',
          email: 'mum@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[0]
        },
        {
          username: 'dad',
          email: 'dad@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[0]
        },
        {
          username: 'uncle',
          email: 'uncle@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[0]
        },
        {
          username: 'niece',
          email: 'niece@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[0]
        },
        {
          username: 'son',
          email: 'son@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[0]
        },
        {
          username: 'one',
          email: 'one@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[1]
        },
        {
          username: 'two',
          email: 'two@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[1]
        },
        {
          username: 'three',
          email: 'three@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[1]
        },
        {
          username: 'four',
          email: 'four@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[1]
        },
        {
          username: 'five',
          email: 'five@google',
          password: 'google',
          passwordConfirmation: 'google',
          family: families[1]
        }
      ])
    })
    .then(users => {
      console.log(`${users.length} users created`)
      return Announcement.create([
        {
          text: 'Are we having dinner at ours tonight?',
          user: users[0],
          family: users[0].family,
          comments: [{
            text: 'Sure what time',
            user: users[1],
            family: users[1].family
          },
          {
            text: 'I will not be able to make it',
            user: users[2],
            family: users[2].family
          },
          {
            text: 'That is a shame!',
            user: users[1],
            family: users[1].family
          }
          ]
        },
        {
          text: 'Who wants to play tennis later?',
          user: users[3],
          family: users[3].family,
          comments: [{
            text: 'I will join later on',
            user: users[0],
            family: users[0].family
          },
          {
            text: 'Not me unfortunately I do not feel well today',
            user: users[1],
            family: users[1].family
          },
          {
            text: 'Get better soon!',
            user: users[2],
            family: users[2].family
          },
          {
            text: 'Take care!',
            user: users[3],
            family: users[3].family
          }
          ]
        },
        {
          text: 'Is anyone around to look after the dog today?',
          user: users[8],
          family: users[8].family,
          comments: [{
            text: 'Sure what time?',
            user: users[9],
            family: users[9].family
          }]
        }
      ])
    })
    .then(announcements => console.log(`${announcements.length} announcements created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})

// no need to export the seeds
