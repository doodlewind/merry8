function View (conf) {
  // Init canvas context.
  const canvas = document.querySelector(conf.el)
  canvas.setAttribute('width', `${conf.width}px`)
  canvas.setAttribute('height', `${conf.width / 2}px`)
  const ctx = canvas.getContext('2d')

  // Init emulator screen pixels.
  let screen = Array.from({ length: 64 }, row => {
    return Array.from({ length: 32 }, col => 0)
  })

  // First render after init.
  render()

  // Clear the screen.
  function clear () {
    screen = screen.map(row => row.map(col => 0))
  }

  // Update the `screen` pixels, then call `render` to update canvas.
  // Return true if collision exists.
  function draw (x, y, n, c8) {
    const pixels = c8.MEM.filter((p, i) => i >= c8.I && i < c8.I + n)
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < n; j++) {
        const _x = i + x > 63 ? 127 - (i + x) : (i + x)
        const _y = j + y > 31 ? 63 - (j + y) : (j + y)
        // HACK correct screen offset by mutating indices.
        screen[_x - 1][_y] = screen[_x - 1][_y] ^ (pixels[j] >> (7 - i) & 1)
      }
    }
    render()
    if (window.DEBUG) {
      console.log(`Drawing at (${x}, ${y}) with ${n} bytes`)
    }
    // TODO detect if collision exists.
    return false
  }

  // Render canvas according to `screen`.
  function render () {
    // Default pixel size.
    const pSize = conf.width / 64
    screen.forEach((row, i) => row.forEach((col, j) => {
      ctx.fillStyle = col ? 'white' : 'black'
      ctx.fillRect(i * pSize, j * pSize, pSize, pSize)
    }))
  }

  return {
    clear,
    draw
  }
}

export default View
