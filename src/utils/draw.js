module.exports = (x, y, n, c8) => {
  console.log(`Drawing at (${x}, ${y}) with ${n} bytes`)
  const pixels = c8.MEM
    .filter((p, i) => i >= c8.I && i < c8.I + n)
  console.log(pixels)
  // return if collision exists
  return false
}
