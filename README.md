# parse-bmfont-xml

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Parses XML [BMFont files](http://www.angelcode.com/products/bmfont/).

Takes a string or Buffer:

```js
var fs = require('fs')
var parse = require('parse-bmfont-xml')

fs.readFileSync(__dirname+'/Arial.fnt', function(err, data) {
  var result = parse(data)
  console.log(result.info.face)   // "Arial"
  console.log(result.pages)       // [ 'sheet0.png' ]
  console.log(result.chars)       // [ ... char data ... ]
  console.log(result.kernings)    // [ ... kernings data ... ]
})
```

Also works in the browser, for example using XHR:

```js
var parse = require('parse-bmfont-xml')
var xhr = require('xhr')

xhr({ uri: 'fonts/NexaLight32.xml' }, function(err, res, body) {
  if (err)
    throw err
  var result = parse(body)
  console.log(result.info.face)
})
```

The spec for the returned JSON object is [here](https://github.com/mattdesl/bmfont2json/wiki/JsonSpec). The input XML should match the spec with a `<font>` root element, see [test/Nexa Light-32.fnt](test/Nexa Light-32.fnt) for an example.

Related modules:

- [parse-bmfont-ascii](https://www.npmjs.com/package/parse-bmfont-ascii) - parses ASCII (text) fonts
- [bmfon2json](https://github.com/mattdesl/bmfont2json) - wraps this module as a CLI tool

## Usage

[![NPM](https://nodei.co/npm/parse-bmfont-xml.png)](https://www.npmjs.com/package/parse-bmfont-xml)

#### `result = parse(data)`

Parses `data`, a string or Buffer that represents XML data of an AngelCode BMFont file. The returned `result` object looks like this:

```js
{
     pages: [
         "sheet_0.png", 
         "sheet_1.png"
     ],
     chars: [
         { chnl, height, id, page, width, x, y, xoffset, yoffset, xadvance },
         ...
     ],
     info: { ... },
     common: { ... },
     kernings: [
         { first, second, amount }
     ]
}
```

If the data is malformed, an error will be thrown.

The browser implementation relies on [xml-parse-from-string](https://github.com/Jam3/xml-parse-from-string), which may not work in environments without valid DOM APIs (like CocoonJS).

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/parse-bmfont-xml/blob/master/LICENSE.md) for details.
