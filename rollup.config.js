import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const plugins = [json(), babel()]
if (process.env.NODE_ENV === 'production') plugins.push(uglify())

export default {
  entry: 'src/index.js',
  format: 'iife',
  moduleName: 'Merry8',
  plugins,
  dest: 'dist/merry8.js'
}
