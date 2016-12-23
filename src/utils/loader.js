const fs = require('fs')
const path = require('path')

module.exports = {
  load (name) {
    return new Promise((resolve, reject) => {
      const fileName = path.join(process.cwd(), 'roms', name)
      fs.readFile(fileName, (err, data) => {
        if (err) reject(err)
        resolve(new Uint8Array(data))
      })
    })
  }
}
