const loader = require('./utils/loader')
const disassembler = require('./utils/disassembler')

loader.load('PONG').then(file => {
  const insArr = disassembler.load(file)
  disassembler.parse(insArr)
}).catch(() => console.log('Error loading rom'))
