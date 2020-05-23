/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */ /* eslint-disable no-console */
const fs = require('fs')
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')

const filepath = path.join(__dirname, 'db.json')
const router = jsonServer.router(filepath)
let db = require(filepath)

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: 'node_modules/json-server/dist',
})

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser)

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 0)
})

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// server.post('/courses/', function (req, res, next) {
//   const error = validateCourse(req.body)
//   if (error) {
//     res.status(400).send(error)
//   } else {
//     req.body.slug = createSlug(req.body.title) // Generate a slug for new courses.
//     next()
//   }
// })

server.post('/course/', function (req, res) {
  const result = []
  let course
  for (course of db.courses) {
    if (req.body.uids.includes(course.uid)) {
      result.push(course)
    }
  }
  return res.json({ status: 'Success', course: result })
})

server.post('/user/student/', function (req, res) {
  const result = []
  let user
  for (user of db.users.filter((user) => user.role == 'Student')) {
    if (req.body.uids.includes(user.uid)) {
      result.push({ uid: user.uid, name: user.name, course: user.course })
    }
  }
  return res.json({ status: 'Success', student: result })
})

server.post('/user/teacher/', function (req, res) {
  const result = []
  let user
  for (user of db.users.filter((user) => user.role == 'Teacher')) {
    if (req.body.uids.includes(user.uid)) {
      result.push({ uid: user.uid, name: user.name })
    }
  }
  return res.json({ status: 'Success', teacher: result })
})

server.post('/user/signup/', function (req, res) {
  const error = validateSignupUser(req.body)
  if (error) {
    return res.json({ status: 'Error', error: error })
  } else {
    try {
      const uid =
        req.body.role.toLowerCase() +
        '_' +
        Math.floor(Math.random() * 9999999999)
      const user = {
        uid: uid,
        rollNo: '',
        profileImage: 'https://picsum.photos/200',
        username: req.body.email,
        email: req.body.email,
        password: req.body.password,
        hash: uid,
        name: req.body.name,
        role: req.body.role,
        phone: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          country: '',
          zip: '',
        },
        dateOfBirth: '',
        school: '',
        classroom: [],
        course: [],
        teacher: [],
        student: [],
        isVerified: true,
        createdOn: Date.now(),
        modifiedOn: Date.now(),
      }

      db = { ...db, users: db.users.concat([user]) }
      const data = JSON.stringify(db)
      fs.writeFile(filepath, data, function (err) {
        if (err) {
          return res.json({ status: 'Error', error: err })
        } else {
          return res.json({ status: 'Success', user: user })
        }
      })
    } catch (err) {
      return res.json({
        status: 'Error',
        error: err,
      })
    }
  }
})

server.post('/user/signin/', function (req, res) {
  const error = validateSigninUser(req.body)
  if (error) {
    return res.json({ status: 'Error', error: error })
  } else {
    try {
      let user
      for (user of db.users) {
        if (
          user.email == req.body.email &&
          user.password == req.body.password
        ) {
          return res.json({ status: 'Success', user: user })
        }
      }
      throw 'Email or Password was incorrect.'
    } catch (err) {
      return res.json({
        status: 'Error',
        error: err,
      })
    }
  }
})

server.post('/user/signout/', function (req, res) {
  return res.json({ status: 'Success', user: req.body.user })
})

// Use default router
server.use(router)

// Start server
const port = 3001
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})

// Centralized logic

// Returns a URL friendly slug
// function createSlug(value) {
//   return value
//     .replace(/[^a-z0-9_]+/gi, '-')
//     .replace(/^-|-$/g, '')
//     .toLowerCase()
// }

// function validateCourse(course) {
//   if (!course.title) return 'Title is required.'
//   if (!course.authorId) return 'Author is required.'
//   if (!course.category) return 'Category is required.'
//   return ''
// }

function validateSigninUser(user) {
  if (!user.email) return 'Email is required.'
  if (!user.password) return 'Password is required.'
  return ''
}

function validateSignupUser(user) {
  if (!user.name) return 'Name is required.'
  if (!user.email) return 'Email is required.'
  if (!user.password) return 'Password is required.'
  if (!user.role) return 'Role is required.'
  return ''
}
