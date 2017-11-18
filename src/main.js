// main wrapper of core emulator
import chip8 from './chip8'

const load = (file, conf) => {
  chip8.load(file, conf)
}

window.chip8 = { load }

export default {
  load
}
