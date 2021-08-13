const authService = require('../services/auth')

const login = async (req, res, next) => {
    try {
        const userId = req.body.userId, password = req.body.password
        const response = await authService.login(userId, password)
        res.json(response)
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    login
}