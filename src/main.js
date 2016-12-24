const loader = require('./utils/loader')
const chip8 = require('./chip8')

loader.load('PONG').then(file => {
  chip8.load(file)
}).catch(e => console.log(e))
