import assert from 'assert'
import { getIns } from '../src/utils/disassembler'

module.exports = () => {
  assert.deepEqual(getIns(0x1234), ['1nnn', 'JP', 0x234], '1nnn')
  assert.deepEqual(getIns(0x3721), ['3xkk', 'SE', 0x7, 0x21], '3xkk')
  assert.deepEqual(getIns(0x4ABC), ['4xkk', 'SNE', 0xA, 0xBC], '4xkk')
  assert.deepEqual(getIns(0x5230), ['5xy0', 'SE', 0x2, 0x3], '5xy0')
  assert.deepEqual(getIns(0x6ABC), ['6xkk', 'LD', 0xA, 0xBC], '6xkk')
  assert.deepEqual(getIns(0x7ABC), ['7xkk', 'ADD', 0xA, 0xBC], '7xkk')
  assert.deepEqual(getIns(0x8080), ['8xy0', 'LD', 0x0, 0x8], '8xy0')
  assert.deepEqual(getIns(0xDCBA), ['Dxyn', 'DRW', 0xC, 0xB, 0xA], 'Dxyn')
  assert.deepEqual(getIns(0xFA1E), ['Fx1E', 'ADD', 0xA], 'Fx1E')
}
