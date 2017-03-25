// main wrapper of core emulator
import chip8 from './chip8'

const load = (file, conf) => {
  chip8.load(file, conf)
}

if (typeof window !== 'undefined') {
  window.chip8 = {
    load
  }
}

export default {
  load
}
