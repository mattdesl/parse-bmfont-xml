var test = require('tape')
var expected = require('./NexaLight32.json')
var fs = require('fs')
var path = require('path')

var parse = require('../')

test('should parse XML file', function(t) {
  var file = path.join(__dirname, 'NexaLight32.fnt')
  
  t.plan(5)
  fs.readFile(file, function(err, data) {
    if (err) t.fail(err)

    var result = parse(data)
    t.deepEqual(result, expected, 'should handle Buffer')
    t.deepEqual(parse(data.toString('utf8')), expected, 'should handle string')
    t.equal(result.info.face, 'Nexa Light', 'face parsed')
    t.equal(result.chars.length, 96, 'chars parsed')
    t.equal(result.kernings.length, 487, 'kernings parsed')  
  })
})