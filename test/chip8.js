const assert = require('assert')
const isEqual = require('arraybuffer-equal')
const ops = require('../src/chip8').ops
const initMem = require('../src/chip8').initMem

const c8 = rom => {
  return {
    MEM: initMem(rom),
    STACK: new Uint16Array(16),
    V: new Uint8Array(16),
    I: 0x0000,
    PC: 0x0200,
    SP: 0x00,
    DELAY: 0x00,
    SOUND: 0x00
  }
}

const testIns = (ins, rom, prevState, nextState) => {
  const execState = ops[ins[0]](ins, prevState, rom)
  assert(isEqual(prevState.MEM.buffer, nextState.MEM.buffer), ins[0])
  assert(isEqual(prevState.V.buffer, nextState.V.buffer), ins[0])
  delete prevState.MEM
  delete prevState.V
  delete nextState.MEM
  delete nextState.V
  assert.deepEqual(prevState, nextState, ins[0])
}

module.exports = rom => {
  testIns(['2nnn', 'CALL', 0x2D4], rom, c8(rom), {
    MEM: initMem(rom), V: new Uint8Array(16),
    STACK: new Uint16Array([
      0x200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]),
    I: 0x0000, PC: 0x02D4, SP: 0x01, DELAY: 0x00, SOUND: 0x00
  })
  testIns(['6xkk', 'LD', 0xA, 0x02], rom, c8(rom), {
    MEM: initMem(rom),
    STACK: new Uint16Array(16),
    V: new Uint8Array([
      /**
      0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F **/
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0
    ]),
    I: 0x0000, PC: 0x0202, SP: 0x00, DELAY: 0x00, SOUND: 0x00
  })
  testIns(['Annn', 'LD', 0x123], rom, c8(rom), {
    MEM: initMem(rom), V: new Uint8Array(16),
    STACK: new Uint16Array(16),
    I: 0x0123, PC: 0x0202, SP: 0x00, DELAY: 0x00, SOUND: 0x00
  })
}