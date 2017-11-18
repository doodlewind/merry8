import fs from 'fs'
import path from 'path'

function load (name) {
  return new Promise((resolve, reject) => {
    const fileName = path.join(process.cwd(), 'roms', name)
    fs.readFile(fileName, (err, data) => {
      if (err) reject(err)
      resolve(new Uint8Array(data))
    })
  })
}

export default {
  load
}
