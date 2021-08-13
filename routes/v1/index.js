const router = require("express").Router()
const authMiddleware = require('../../middlewares/auth')

router.use('/auth',require('./auth'))
router.use(authMiddleware.auth)
router.use('/cart',require('./cart'))

module.exports=router