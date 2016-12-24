const assert = require('assert')
const getIns = require('../src/utils/disassembler').getIns

module.exports = () => {
  assert.deepEqual(getIns(0x1234), ['JP', 0x234], '1nnn')
  assert.deepEqual(getIns(0x3721), ['SE', 0x7, 0x21], '3xkk')
  assert.deepEqual(getIns(0x4ABC), ['SNE', 0xA, 0xBC], '4xkk')
  assert.deepEqual(getIns(0x5230), ['SE', 0x2, 0x3], '5xy0')
  assert.deepEqual(getIns(0x6ABC), ['LD', 0xA, 0xBC], '6xkk')
  assert.deepEqual(getIns(0x7ABC), ['ADD', 0xA, 0xBC], '7xkk')
  assert.deepEqual(getIns(0x8080), ['LD', 0x0, 0x8], '8xy0')
  assert.deepEqual(getIns(0xDCBA), ['DRW', 0xC, 0xB, 0xA], 'Dxyn')
  assert.deepEqual(getIns(0xFA1E), ['ADD', 0xA], 'Fx1E')
}
