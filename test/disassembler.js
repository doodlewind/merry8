const assert = require('assert')
const getIns = require('../src/utils/disassembler').getIns

module.exports = () => {
  assert.deepEqual(getIns(0x1234), ['JP', 0x234], '1nnn')
  assert.deepEqual(getIns(0x8080), ['LD', 0x0, 0x8], '8xy0')
}
