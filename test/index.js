import loader from './loader'
import disassembler from '../src/utils/disassembler'
import disassemblerTest from './disassembler'
import chip8Test from './chip8'

loader.load('PONG').then(file => {
  disassemblerTest()
  chip8Test(disassembler.loadAs16bits(file))
}).catch(e => console.log(e))
