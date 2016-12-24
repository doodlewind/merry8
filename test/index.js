const loader = require('../src/utils/loader')
const disassembler = require('../src/utils/disassembler')

loader.load('PONG').then(file => {
  require('./disassembler')()
  require('./chip8')(disassembler.loadAs16bits(file))
}).catch(e => console.log(e))
