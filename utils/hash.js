const bcrypt = require('bcrypt')

const compareHash = async (plainText, hash) => {
    let value =await bcrypt.compare(plainText, hash)
    return value
}

module.exports ={
    compareHash
}