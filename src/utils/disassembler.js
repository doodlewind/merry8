// input 16bits ins 0x0000
const getIns = (ins) => {
  // 00E0 - CLS
  if (ins === 0x00E0) {
    return ['00E0', 'CLS']
  }
  // 00EE - RET
  else if (ins === 0x00EE) {
    return ['00EE', 'RET']
  }
  // 0nnn - SYS addr
  else if (ins >>> 12 === 0x0) {
    return ['0nnn', 'SYS', ins & 0x0FFF]
  }
  // 1nnn - JP addr
  else if (ins >>> 12 === 0x1) {
    return ['1nnn', 'JP', ins & 0x0FFF]
  }
  // 2nnn - CALL addr
  else if (ins >>> 12 === 0x2) {
    return ['2nnn', 'CALL', ins & 0x0FFF]
  }
  // 3xkk - SE Vx, byte
  else if (ins >>> 12 === 0x3) {
    return ['3xkk', 'SE', (ins & 0x0F00) >>> 8, ins & 0x00FF]
  }
  // 4xkk - SNE Vx, byte
  else if (ins >>> 12 === 0x4) {
    return ['4xkk', 'SNE', (ins & 0x0F00) >>> 8, ins & 0x00FF]
  }
  // 5xy0 - SE Vx, Vy
  else if (ins >>> 12 === 0x5 && (ins & 0x000F) === 0x0) {
    return ['5xy0', 'SE', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 6xkk - LD Vx, byte
  else if (ins >>> 12 === 0x6) {
    return ['6xkk', 'LD', (ins & 0x0F00) >>> 8, ins & 0x00FF]
  }
  // 7xkk - ADD Vx, byte
  else if (ins >>> 12 === 0x7) {
    return ['7xkk', 'ADD', (ins & 0x0F00) >>> 8, ins & 0x00FF]
  }
  // 8xy0 - LD Vx, Vy
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x0) {
    return ['8xy0', 'LD', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xy1 - OR Vx, Vy
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x1) {
    return ['8xy1', 'OR', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xy2 - AND Vx, Vy
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x2) {
    return ['8xy2', 'AND', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xy3 - XOR Vx, Vy
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x3) {
    return ['8xy3', 'XOR', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xy4 - ADD Vx, Vy
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x4) {
    return ['8xy4', 'ADD', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xy5 - SUB Vx, Vy
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x5) {
    return ['8xy5', 'SUB', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xy6 - SHR Vx {, Vy}
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x6) {
    return ['8xy6', 'SHR', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xy7 - SUBN Vx, Vy
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0x7) {
    return ['8xy7', 'SUBN', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 8xyE - SHL Vx {, Vy}
  else if (ins >>> 12 === 0x8 && (ins & 0x000F) === 0xE) {
    return ['8xyE', 'SHL', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // 9xy0 - SNE Vx, Vy
  else if (ins >>> 12 === 0x9 && (ins & 0x000F) === 0x0) {
    return ['9xy0', 'SNE', (ins & 0x0F00) >>> 8, (ins & 0x00F0) >>> 4]
  }
  // Annn - LD I, addr
  else if (ins >>> 12 === 0xA) {
    return ['Annn', 'LD', ins & 0x0FFF]
  }
  // Bnnn - JP V0, addr
  else if (ins >>> 12 === 0xB) {
    return ['Bnnn', 'JP', ins & 0x0FFF]
  }
  // Cxkk - RND Vx, byte
  else if (ins >>> 12 === 0xC) {
    return ['Cxkk', 'RND', (ins & 0x0F00) >>> 8, ins & 0x00FF]
  }
  // Dxyn - DRW Vx, Vy, nibble
  else if (ins >>> 12 === 0xD) {
    return [
      'Dxyn',
      'DRW',
      (ins & 0x0F00) >>> 8,
      (ins & 0x00F0) >>> 4,
      ins & 0x000F
    ]
  }
  // Ex9E - SKP Vx
  else if (ins >>> 12 === 0xE && (ins & 0xFF) === 0x9E) {
    return ['Ex9E', 'SKP', (ins & 0x0F00) >>> 8]
  }
  // ExA1 - SKNP Vx
  else if (ins >>> 12 === 0xE && (ins & 0xFF) === 0xA1) {
    return ['ExA1', 'SKNP', (ins & 0x0F00) >>> 8]
  }
  // Fx07 - LD Vx, DT
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x07) {
    return ['Fx07', 'LD', (ins & 0x0F00) >>> 8]
  }
  // Fx0A - LD Vx, K
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x0A) {
    return ['Fx0A', 'LD', (ins & 0x0F00) >>> 8]
  }
  // Fx15 - LD DT, Vx
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x15) {
    return ['Fx15', 'LD', (ins & 0x0F00) >>> 8]
  }
  // Fx18 - LD ST, Vx
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x18) {
    return ['Fx18', 'LD', (ins & 0x0F00) >>> 8]
  }
  // Fx1E - ADD I, Vx
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x1E) {
    return ['Fx1E', 'ADD', (ins & 0x0F00) >>> 8]
  }
  // Fx29 - LD F, Vx
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x29) {
    return ['Fx29', 'LD', (ins & 0x0F00) >>> 8]
  }
  // Fx33 - LD B, Vx
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x33) {
    return ['Fx33', 'LD', (ins & 0x0F00) >>> 8]
  }
  // Fx55 - LD [I], Vx
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x55) {
    return ['Fx35', 'LD', (ins & 0x0F00) >>> 8]
  }
  // Fx65 - LD Vx, [I]
  else if (ins >>> 12 === 0xF && (ins & 0xFF) === 0x65) {
    return ['Fx65', 'LD', (ins & 0x0F00) >>> 8]
  }
  else {
    return ['ERROR', ins.toString(16)]
  }
}

module.exports = {
  getIns,
  loadAs16bits (fileArr) {
    // split 8bits int array into 16bits opcodes array
    return fileArr.reduce((acc, currItem, currIndex) => {
      const x = Math.floor(currIndex / 2)
      if (!acc[x]) acc[x] = []
      acc[x].push(currItem)
      return acc
    }, []).map(ins => ins[0] << 8 | ins[1])
  },
  parse (insArr) {
    insArr.forEach(ins => {
      if (getIns(ins)[0] !== 'ERROR')
        console.log(ins.toString(16), getIns(ins).map(s => s.toString(16)))
    })
  }
}
