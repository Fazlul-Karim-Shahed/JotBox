const { Signin } = require('../Controllers/UserController/SigninFunctions')
const { Signup } = require('../Controllers/UserController/SignupFunctions')
const { getAllUser } = require('../Controllers/UserController/getAllUser')


const router = require('express').Router()

router.post('/signin', Signin)
router.post('/signup', Signup)
router.get('/', getAllUser)

module.exports = router