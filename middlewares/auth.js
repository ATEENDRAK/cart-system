const jwtUtils = require('../utils/jwt')
const HttpError = require('../errors')

const auth = async (req, res, next) => {
    try {
        let secret = process.env['secret'] || "qwerty"
        let token = req.headers['x-auth-token']
        if(!token){
            return next(new HttpError(401,"Access Token Required"))
        }
        let payload = await jwtUtils.verify(token, secret)
        req.session = payload
        next()
    }
    catch (err) {
        if(err.name === "TokenExpiredError")
            next(new HttpError(401,"Token Expired"))
        else if(err.name === "JsonWebTokenError")
            next(new HttpError(401,"Invalid Token"))
        else
            next(err)
    }
}

module.exports={
    auth
}