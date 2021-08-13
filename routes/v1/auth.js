const router = require('express').Router()
const authValidator = require('../../validations/auth')
const authController = require('../../controllers/auth')

router.post('/login',authValidator.login,authController.login)

module.exports = router