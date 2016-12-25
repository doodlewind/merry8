let _conf = {
  el: '#app',
  width: 500,
  prefix: 'chip8'
}

let scr = Array.from({ length: 64 }, row => {
  return Array.from({ length: 32 }, col => 0)
})

const color = pixel => pixel ? 'white' : 'black'

const clear = () => scr = scr.map(row => row.map(col => 0))

const renderStr = () => {
  let str = '\n'
  for (let j = 0; j < 32; j++) {
    str += `<div class="${_conf.prefix}-row">\n`
    for (let i = 0; i < 64; i++) {
      str += `  <div style="background-color: ${color(scr[i][j])}"></div>\n`
    }
    str += '</div>\n'
  }
  return str
}

const init = (conf = {}) => {
  if (typeof window !== 'undefined') {
    _conf = Object.assign(_conf, conf)
    const style = document.createElement('style')
    document.querySelector(conf.el)
    document.head.appendChild(style)
    style.sheet.insertRule(`.${_conf.prefix}-row {
      margin: auto;
      display: flex;
      align-items: space-between;
      width: ${_conf.width}px;
      height: ${_conf.width / 64}px;
    }`, 0)
    style.sheet.insertRule(`.${_conf.prefix}-row > div {
      flex-grow: 1;
      height: ${_conf.width / 64}px;
    }`, 0)
    document.querySelector(_conf.el).innerHTML = renderStr()
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
  if (typeof window !== 'undefined') {
    document.querySelector(_conf.el).innerHTML = renderStr()
  } else {
    console.log(`Drawing at (${x}, ${y}) with ${n} bytes`)
  }
  // return if collision exists
  // debugger
  return false
}

module.exports = {
  init,
  clear,
  draw
}
