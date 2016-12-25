const isBrowser = (typeof window !== 'undefined')
let _conf = {
  el: '#app',
  width: 500,
  prefix: 'chip8'
}

let scr = Array.from({ length: 64 }, row => {
  return Array.from({ length: 32 }, col => 0)
})
let ctx = null

const clear = () => scr = scr.map(row => row.map(col => 0))

const renderCanvas = () => {
  let pLen = _conf.width / 64
  scr.forEach((row, i) => row.forEach((col, j) => {
    ctx.fillStyle = col ? 'white' : 'black'
    ctx.fillRect(i * pLen, j * pLen, pLen, pLen)
  }))
}

const init = (conf = {}) => {
  if (typeof window !== 'undefined') {
    _conf = Object.assign(_conf, conf)
    const style = document.createElement('style')
    document.head.appendChild(style)
    style.sheet.insertRule(`canvas {
      margin: auto;
      display: block;
      width: ${_conf.width}px;
      height: ${_conf.width / 2}px;
    }`, 0)
    const canvas = document.querySelector(conf.el)
    canvas.setAttribute('width', `${_conf.width}px`)
    canvas.setAttribute('height', `${_conf.width / 2}px`)
    ctx = canvas.getContext('2d')
    renderCanvas()
  } else {
    console.log('Node ENV not supported')
  }
}


const draw = (x, y, n, c8) => {
  const pixels = c8.MEM.filter((p, i) => i >= c8.I && i < c8.I + n)
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < n; j++) {
      let _x = i + x > 63 ? 127 - (i + x) : (i + x)
      let _y = j + y > 31 ? 63 - (j + y) : (j + y)
      // HACK on offest
      scr[_x - 1][_y] = scr[_x - 1][_y] ^ (pixels[j] >> (7 - i) & 1)
    }
  }
  if (isBrowser) renderCanvas()
  else console.log(`Drawing at (${x}, ${y}) with ${n} bytes`)
  // return if collision exists
  // debugger
  return false
}

module.exports = {
  init,
  clear,
  draw
}
