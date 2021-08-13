const HttpError = require('../errors')

const login=(req,res,next)=>{
    const userId = req.body.userId, password=req.body.password
    if(!(typeof userId === "string" && userId.length >= 0)){
        next(new HttpError(400,"Invalid User Id"))
        return
    }
    if(!(typeof password === "string" && password.length >= 5)){
        next(new HttpError(400,"Invalid Password"))
        return
    }
    next()
}

module.exports ={
    login
}