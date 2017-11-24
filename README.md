# merry8
Chip-8 emulator for web.

## API
Besides the demo, you can simply `npm install merry8` and run it in your own project!

```
import Merry8 from 'merry8'

// Provide chip-8 rom, canvas element and its default width.
const merry8 = new Merry8(rom, {
  el: '#app',
  width: 500
})

merry8.run()
```

### `merry8.run()`
Start emulator main loop.

### `merry8.press(key: number)`
Emulate a key press, `key` ranges from 0 to 15.

## Development
For a quick start, `npm run demo` and open `localhost:9001`.

To test cpu instructions, simply run `npm test`.

## Changelog
* `0.3.0` - 2017/11/19
    * Expose emulator API.
    * Support multi emulator instances.
    * Rewrite project structure with class syntax.
    * Fix test failure.
    * Migrate to `babel-preset-env`.
* `0.2.1` - 2017/03/25
    * Migrate to rollup.
* `0.2.0` - 2016/12/25
    * Migrate view layer to canvas.
* `0.1.0` - 2016/12/25
    * Implement interpreter and GUI with basic PONG support.

## License
MIT
