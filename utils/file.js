const fs = require('fs')
const { nextTick } = require('process')
const fsPromises = fs.promises
const errors = require('../errors')

const readFile = async (filename) => {
    try {
        filename = './data/' + filename
        return await fsPromises.readFile(filename,{
            encoding: 'utf8'
        })
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return null;
        }
        throw err;
    }
}

const writeFile = async (data, filename) => {
    filename = './data/' + filename
    fs.writeFileSync(filename, data,{
        encoding: 'utf8'
    });
}

module.exports = {
    readFile,
    writeFile
}