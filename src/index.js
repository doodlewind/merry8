// node entry
const main = require('./main')
const loader = require('./utils/loader')

loader.load('PONG').then(file => main.load(file, { speed: 1 }))
