var load = require('xhr')
var parse = require('../')
var expected = require('./NexaLight32.json')
var test = require('tape')

test('should parse XML font file', function(t) {
  t.plan(1)

  load({ uri: 'test/NexaLight32.fnt' }, function(err, res, body) {
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
  