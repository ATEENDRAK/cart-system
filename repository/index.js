const fs = require('fs').promises
const HttpError = require('../errors')
let locks = {}

const writeToFile = async (data, filename) => {
    try {

        let lock = locks[filename]
        let newLock = getNewWriteLock(lock, filename, data)
        locks[filename] = {
            lock: newLock,
            type: "w"
        }
        let res = await newLock
        return {
            success: true,
            error: null
        }
    }
    catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}

const readFromFile = async (filename) => {
    try {
        let lock = locks[filename]
        let newLock = getNewReadLock(lock, filename)
        locks[filename] = {
            lock: newLock,
            type: 'r'
        }
        return await newLock

    }
    catch (err) {
        console.log(err)
    }

}

const getNewWriteLock = async (lock, filename, data) => {
    await lock.lock
    await fs.writeFile(filename, data)
}

const getNewReadLock = async (lock, filename) => {
    if (lock.type === 'w') {
        await lock.lock
        let res = await fs.readFile(filename)
        return res
    }
    else if (lock.type === 'r') {
        return await lock.lock
    }
}


module.exports = {
    writeToFile,
    readFromFile
}
