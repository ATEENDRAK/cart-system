const jwt = require('jsonwebtoken')

const sign = (payload, secret, subject) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { subject}, (err, token) => {
            if (err != null)
                reject(err)
            resolve(token)
        })
    })
}

const verify = (token,secret) =>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(err,value)=>{
            if(err != null)
                reject(err)
            resolve(value)
        })
    })
}

module.exports = {
    sign,
    verify
}