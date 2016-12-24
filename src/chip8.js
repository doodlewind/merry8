const getIns = require('./utils/disassembler').getIns
const draw = require('./utils/draw')

const initMem = rom => {
  const mem = new Uint8Array(0xFFF)
  rom.forEach((b, i) => mem[i + 0x200] = b)
  return mem
}

const read = (mem, pc) => mem[pc] << 8 | mem[pc + 1]

const ops = {
  // 0nnn - SYS addr
  '0nnn': (ins, c8, rom) => {
    let [, , addr] = ins
    c8.PC += 2
    throw Error('0nnn')
  },
  // 2nnn - CALL addr
  '2nnn': (ins, c8, rom) => {
    let [, , addr] = ins
    c8.STACK[c8.SP++] = c8.PC
    c8.PC = addr
    return c8
  },
  // 6xkk - LD Vx, byte
  '6xkk': (ins, c8, rom) => {
    let [, , x, byte] = ins
    c8.V[x] = byte
    c8.PC += 2
    return c8
  },
  // 8xy2 - AND Vx, Vy
  '8xy2': (ins, c8, rom) => {
    let [, , x, y] = ins
    c8.V[x] = c8.V[x] & c8.V[y]
    c8.PC += 2
    return c8
  },
  // 8xy4 - ADD Vx, Vy
  '8xy4': (ins, c8, rom) => {
    let [, , x, y] = ins
    c8.V[x] = c8.V[x] + c8.V[y]
    c8.V[0xF] = (x + y > 0xFF) ? 1 : 0
    c8.PC += 2
    return c8
  },
  // Annn - LD I, addr
  'Annn': (ins, c8, rom) => {
    let [, , addr] = ins
    c8.I = addr
    c8.PC += 2
    return c8
  },
  // Dxyn - DRW Vx, Vy, nibble
  'Dxyn': (ins, c8, rom) => {
    let [, , x, y, n] = ins
    c8.V[0xF] = draw(x, y, n, c8)
    c8.PC += 2
    return c8
  }
}

const run = (rom, c8) => {
  while (true) {
    let ins = getIns(read(c8.MEM, c8.PC))
    console.log(ins)
    try {
      ops[ins[0]](ins, c8, rom)
    } catch (e) {
      console.log('Last state')
      console.log({
        V: Array.from(c8.V).map(v => v.toString(16)),
        I: c8.I.toString(16),
        PC: c8.PC.toString(16),
        SP: c8.SP.toString(16),
        STACK: c8.STACK,
        DELAY: c8.DELAY,
        SOUND: c8.SOUND
      })
      break
    }
  }
}

module.exports = {
  initMem,
  ops,
  load (rom) {
    const c8 = {
      MEM: initMem(rom),
      V: new Uint8Array(16),
      STACK: new Uint16Array(16),
      I: 0x0000,
      PC: 0x0200,
      SP: 0x00,
      DELAY: 0x00,
      SOUND: 0x00
    }
    run(rom, c8)
  }
}
