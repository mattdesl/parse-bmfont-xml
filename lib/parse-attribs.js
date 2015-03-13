module.exports = function parseAttributes(obj) {
  for (var k in obj) {
    if (k === 'face' || k === 'charset')
      continue
    else if (k === 'padding' || k === 'spacing')
      obj[k] = parseIntList(obj[k])
    else
      obj[k] = parseInt(obj[k], 10)
  }
  return obj
}

function parseIntList(data) {
  return data.split(',').map(function(val) {
    return parseInt(val, 10)
  })
}