// browser entry
const main = require('./main')

const conf = {
  el: '#app',
  width: 500,
  speed: 1
}

const xhr = new XMLHttpRequest()
xhr.open('GET', '/roms/PONG', true)
xhr.responseType = 'arraybuffer'
xhr.onload = () => {
  const rom = new Uint8Array(xhr.response)
  main.load(rom, conf)
}
xhr.send()
