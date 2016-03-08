# lensmith 

  A [Metalsmith](http://www.metalsmith.io/) plugin to format html / js.

## Installation

    $ npm install lensmith 

## CLI Usage

  Install via npm and then add the `lensmith ` key to your `metalsmith.json` plugins with any [js-beautify](https://github.com/einars/js-beautify) options you want, like so:

```json
{
  "plugins": {
    "lensmith ": {
    }
  }
}
```

## Javascript Usage

  Pass `options` to the beautify plugin and pass it to Metalsmith with the `use` method:

```js
var beautify = require('lensmith ');

metalsmith.use(beautify({
}));
```

## License

  MIT

## Credit

The credit for the heavy lifting here goes to the [js-beautify](https://github.com/einars/js-beautify) tool.
