// browser entry
import main from './main'

const conf = {
  el: '#app',
  width: 500,
  speed: 1
}

/* eslint-disable no-undef */
const xhr = new XMLHttpRequest()
xhr.open('GET', '/roms/PONG', true)
xhr.responseType = 'arraybuffer'
xhr.onload = () => {
  const rom = new Uint8Array(xhr.response)
  main.load(rom, conf)
}
xhr.send()
