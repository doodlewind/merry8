const ops = {
  // 0nnn - SYS addr
  // Jump to a machine code routine at nnn.
  '0nnn': (ins, c8) => {
    c8.PC += 2
    throw Error('0nnn')
  },
  // 00E0 - CLS
  // Clear screen.
  '00E0': (ins, c8, view) => {
    view.clear()
    c8.PC += 2
    return c8
  },
  // 00EE - RET
  // Return from a subroutine.
  '00EE': (ins, c8) => {
    c8.PC = c8.STACK[--c8.SP] + 2
    return c8
  },
  // 1nnn - JP addr
  // Jump to location nnn.
  '1nnn': (ins, c8) => {
    const [, , addr] = ins
    c8.PC = addr
    return c8
  },
  // 2nnn - CALL addr
  // Call subroutine at nnn.
  '2nnn': (ins, c8) => {
    const [, , addr] = ins
    c8.STACK[c8.SP++] = c8.PC
    c8.PC = addr
    return c8
  },
  // 3xkk - SE Vx, byte
  // Skip next instruction if Vx = kk.
  '3xkk': (ins, c8) => {
    const [, , x, byte] = ins
    if (c8.V[x] === byte) c8.PC += 4
    else c8.PC += 2
    return c8
  },
  // 4xkk - SNE Vx, byte
  // Skip next instruction if Vx != kk.
  '4xkk': (ins, c8) => {
    const [, , x, byte] = ins
    if (c8.V[x] !== byte) c8.PC += 4
    else c8.PC += 2
    return c8
  },
  // 5xy0 - SE Vx, Vy
  // Skip next instruction if Vx = Vy.
  '5xy0': (ins, c8) => {
    const [, , x, y] = ins
    if (c8.V[x] === c8.V[y]) c8.PC += 4
    else c8.PC += 2
    return c8
  },
  // 6xkk - LD Vx, byte
  // Set Vx = kk.
  '6xkk': (ins, c8) => {
    const [, , x, byte] = ins
    c8.V[x] = byte
    c8.PC += 2
    return c8
  },
  // 7xkk - ADD Vx, byte
  // Set Vx = Vx + kk.
  '7xkk': (ins, c8) => {
    const [, , x, byte] = ins
    c8.V[x] += byte
    c8.PC += 2
    return c8
  },
  // 8xy0 - LD Vx, Vy
  // Set Vx = Vy.
  '8xy0': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[x] = c8.V[y]
    c8.PC += 2
    return c8
  },
  // 8xy1 - OR Vx, Vy
  // Set Vx = Vx OR Vy.
  '8xy1': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[x] = c8.V[x] | c8.V[y]
    c8.PC += 2
    return c8
  },
  // 8xy2 - AND Vx, Vy
  // Set Vx = Vx AND Vy.
  '8xy2': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[x] = c8.V[x] & c8.V[y]
    c8.PC += 2
    return c8
  },
  // 8xy3 - XOR Vx, Vy
  // Set Vx = Vx XOR Vy.
  '8xy3': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[x] = c8.V[x] ^ c8.V[y]
    c8.PC += 2
    return c8
  },
  // 8xy4 - ADD Vx, Vy
  // Set Vx = Vx + Vy, set VF = carry.
  '8xy4': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[0xF] = (c8.V[x] + c8.V[y] > 0xFF) ? 1 : 0
    c8.V[x] = c8.V[x] + c8.V[y]
    c8.PC += 2
    return c8
  },
  // 8xy5 - SUB Vx, Vy
  // Set Vx = Vx - Vy, set VF = NOT borrow.
  '8xy5': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[0xF] = (c8.V[x] > c8.V[y]) ? 1 : 0
    c8.V[x] = c8.V[x] - c8.V[y]
    c8.PC += 2
    return c8
  },
  // 8xy6 - SHR Vx {, Vy}
  // Set Vx = Vy SHR 1.
  '8xy6': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[0xF] = c8.V[y] & 0x1
    c8.V[x] = c8.V[y] >> 1
    c8.PC += 2
    return c8
  },
  // 8xy7 - SUBN Vx, Vy
  // Set Vx = Vy - Vx, set VF = NOT borrow.
  '8xy7': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[0xF] = c8.V[y] > c8.V[x] ? 1 : 0
    c8.V[x] = c8.V[y] - c8.V[x]
    c8.PC += 2
    return c8
  },
  // 8xyE - SHL Vx {, Vy}
  // Set Vx = Vx SHL 1.
  '8xyE': (ins, c8) => {
    const [, , x, y] = ins
    c8.V[0xF] = c8.V[y] >> 7
    c8.V[x] = c8.V[y] << 1
    c8.PC += 2
    return c8
  },
  // 9xy0 - SNE Vx, Vy
  // Skip next instruction if Vx != Vy.
  '9xy0': (ins, c8) => {
    const [, , x, y] = ins
    if (c8.V[x] !== c8.V[y]) c8.PC += 4
    else c8.PC += 2
    return c8
  },
  // Annn - LD I, addr
  // Set I = nnn.
  'Annn': (ins, c8) => {
    const [, , addr] = ins
    c8.I = addr
    c8.PC += 2
    return c8
  },
  // Bnnn - JP V0, addr
  // Jump to location nnn + V0.
  'Bnnn': (ins, c8) => {
    const [, , addr] = ins
    c8.PC = addr + c8.V[0]
    return c8
  },
  // Cxkk - RND Vx, byte
  // Set Vx = random byte AND kk.
  'Cxkk': (ins, c8) => {
    const [, , x, byte] = ins
    c8.V[x] = parseInt(Math.random() * 255) & byte
    c8.PC += 2
    return c8
  },
  // Dxyn - DRW Vx, Vy, nibble
  // Display n-byte sprite starting at memory location I at (Vx, Vy),
  // set VF = collision.
  'Dxyn': (ins, c8, view) => {
    const [, , x, y, n] = ins
    c8.V[0xF] = view.draw(c8.V[x], c8.V[y], n, c8)
    c8.PC += 2
    return c8
  },
  // Ex9E - SKP Vx
  // Skip next instruction if key with the value of Vx is pressed.
  'Ex9E': (ins, c8) => {
    const [, , x] = ins
    if (c8.KEYS[c8.V[x]]) c8.PC += 4
    else c8.PC += 2
    return c8
  },
  // ExA1 - SKNP Vx
  // Skip next instruction if key with the value of Vx is not pressed.
  'ExA1': (ins, c8) => {
    const [, , x] = ins
    if (!c8.KEYS[c8.V[x]]) c8.PC += 4
    else c8.PC += 2
    return c8
  },
  // Fx07 - LD Vx, DT
  // Set Vx = delay timer value.
  'Fx07': (ins, c8) => {
    const [, , x] = ins
    c8.V[x] = c8.DELAY
    c8.PC += 2
    return c8
  },
  // Fx0A - LD Vx, K
  // Wait for a key press, store the value of the key in Vx.
  'Fx0A': (ins, c8) => {
    const [, , x] = ins
    const rndKey = parseInt(Math.random() * 16)
    console.log('Mock press', rndKey.toString(16))
    c8.V[x] = rndKey
    c8.PC += 2
    return c8
  },
  // Fx15 - LD DT, Vx
  // Set delay timer = Vx.
  'Fx15': (ins, c8) => {
    const [, , x] = ins
    c8.DELAY = c8.V[x]
    c8.PC += 2
    return c8
  },
  // Fx18 - LD ST, Vx
  // Set sound timer = Vx.
  'Fx18': (ins, c8) => {
    const [, , x] = ins
    c8.SOUND = c8.V[x]
    c8.PC += 2
    return c8
  },
  // Fx1E - ADD I, Vx
  // Set I = I + Vx.
  'Fx1E': (ins, c8) => {
    const [, , x] = ins
    c8.I = c8.I + c8.V[x]
    c8.PC += 2
    return c8
  },
  // Fx29 - LD F, Vx
  // Set I = location of sprite for digit Vx.
  'Fx29': (ins, c8) => {
    const [, , x] = ins
    c8.I = c8.V[x] * 5
    c8.PC += 2
    return c8
  },
  // Fx33 - LD B, Vx
  // Store BCD representation of Vx in memory locations I, I+1, and I+2.
  'Fx33': (ins, c8) => {
    const [, , x] = ins
    c8.MEM[c8.I] = Math.floor(c8.V[x] / 100)
    c8.MEM[c8.I + 1] = Math.floor((c8.V[x] % 100) / 10)
    c8.MEM[c8.I + 2] = c8.V[x] % 10
    c8.PC += 2
    return c8
  },
  // Fx55 - LD [I], Vx
  // Store registers V0 through Vx in memory starting at location I.
  'Fx55': (ins, c8) => {
    const [, , x] = ins
    for (let i = 0; i <= x; i++) {
      c8.MEM[c8.I++] = c8.V[i]
    }
    c8.PC += 2
    return c8
  },
  // Fx65 - LD Vx, [I]
  // Read registers V0 through Vx from memory starting at location I.
  'Fx65': (ins, c8) => {
    const [, , x] = ins
    for (let i = 0; i <= x; i++) {
      c8.V[i] = c8.MEM[c8.I++]
    }
    c8.PC += 2
    return c8
  }
}

export default ops
