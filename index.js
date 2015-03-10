var xml2js = require('xml2js')

module.exports = function parseBMFontXML(data) {
  data = data.toString().trim()

  var output = {
    pages: [],
    chars: [],
    kernings: []
  }

  xml2js.parseString(data, function(err, result) {
    if (err)
      throw err
    if (!result.font)
      throw "XML bitmap font doesn't have <font> root"
    result = result.font

    output.common = parseXMLAttribs(result.common[0].$)
    output.info = parseXMLAttribs(result.info[0].$)

    for (var i = 0; i < result.pages.length; i++) {
      var p = result.pages[i].page[0].$

      if (typeof p.id === "undefined")
        throw new Error("malformed file -- needs page id=N")
      if (typeof p.file !== "string")
        throw new Error("malformed file -- needs page file=\"path\"")

      output.pages[parseInt(p.id, 10)] = p.file
    }

    var chrArray = result.chars[0]['char'] || []
    for (var i = 0; i < chrArray.length; i++) {
      output.chars.push(parseXMLAttribs(chrArray[i].$))
    }

    var kernArray = result.kernings[0]['kerning'] || []
    for (var i = 0; i < kernArray.length; i++) {
      output.kernings.push(parseXMLAttribs(kernArray[i].$))
    }
  })
  return output
}

function parseXMLAttribs(obj) {
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