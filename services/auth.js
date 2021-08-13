const HttpError = require('../errors')
const userRepository = require('../repository/user')
const hashUtils = require('../utils/hash')
const jwtUtils = require('../utils/jwt')

const login = async (userId, password) => {
    let user = await userRepository.getUserById(userId)
    if (user === null)
        throw new HttpError(401)
    let pwd = user.password
    let passwordMatch = await hashUtils.compareHash(password, pwd)
    if (passwordMatch === false)
        throw new HttpError(401)
    let secret = process.env.secret || "qwerty"
    let payload = {
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 3 * 60 * 60
    }
    let jwtToken = await jwtUtils.sign(payload, secret, user.id)
    return {
        token: jwtToken,
        expiresAt: payload.exp
    }

}

module.exports = {
    login
}