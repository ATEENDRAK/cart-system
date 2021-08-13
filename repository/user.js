const User = require('../models/User')
const files = require('../utils/file')

const getAllUsers = async () => {
    let userData = await files.readFile(`users.json`)
    if (userData === null) {
        return null
    }
    let userDataJson = JSON.parse(userData)
    return generateUsersFromJson(userDataJson)
}

const generateUsersFromJson = (userData) => {
    let users = {}
    for (const [key, value] of Object.entries(userData)) {
        let user = new User(value.id, value.name, value.password)
        users[key] = user
    }
    return users
}

const getUserById = async (userId) => {
    try {
        let userData = await getAllUsers()
        if (userData === null) {
            return userData
        }
        let user = userData[userId]
        return user
    }
    catch (err) {
        throw err
    }
}


module.exports = {
    getAllUsers,
    getUserById
}