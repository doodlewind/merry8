export default function warn (err, ins, c8) {
  console.log('\nLast state:')
  console.log({
    INS: ins,
    V: Array.from(c8.V).map(v => v.toString(16)).join(' '),
    I: '0x' + c8.I.toString(16),
    PC: '0x' + c8.PC.toString(16),
    SP: c8.SP,
    STACK: c8.STACK
  })
  throw err
}
