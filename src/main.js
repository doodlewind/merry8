// main wrapper of core emulator
const chip8 = require('./chip8')

const load = (file, conf) => {
  chip8.load(file, conf)
}

if (typeof window !== 'undefined') {
  window.chip8 = {
    load
  }
}

module.exports = {
  load
}
