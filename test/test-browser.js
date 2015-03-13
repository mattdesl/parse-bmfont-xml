var load = require('xhr')
var parse = require('../')
var expected = require('./NexaLight32.json')
var test = require('tape')
var buffer = require('fs').readFileSync(__dirname+'/NexaLight32.xml')

test('should parse XML font file', function(t) {
  t.plan(1)

  load({ uri: 'test/NexaLight32.xml' }, function(err, res, body) {
    if (err)
      t.fail(err)

    try {
      var result = parse(body)
      t.deepEqual(result, expected, 'matches expected JSON font')
    } catch (e) {
      t.fail(e)
    }
  })
})
  

test('should parse Buffer as XML font file', function(t) {
  try {
    var result = parse(buffer)
    t.deepEqual(result, expected, 'matches expected JSON font')
  } catch (e) {
    t.fail(e)
  }
  t.end()
})
  