/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; var SVL = glob.SVL; var log = new SVL.log.Logger('util01_math.js')

  var gcdHelp = 'Euclidean algorithm to find the greatest common divider'
  var gcd = function (a, b) {
    log.enter('gcd', arguments)
    if (b === 0) return a
    return gcd(b, a % b)
  }
  SVL.set(['math', 'gcd'], gcd)
  SVL.set(['help', 'math', 'gcd'], gcdHelp)

  var meanHelp = 'Arithmetic mean from array or comma seperated string'
  var arithmeticMean = function (inp) {
    var arr
    if (typeof inp === 'string') arr = inp.split(',')
    else {
      if (typeof inp === 'object') arr = inp
      else throw new TypeError('Expected comma seperated string or object')
    }

    var total = 0
    for (var i = 0; i < arr.length; i++) total += parseFloat(arr[i])

    return total / arr.length
  }
  SVL.set(['math', 'mean'], arithmeticMean)
  SVL.set(['help', 'math', 'mean'], meanHelp)

  var baseHelp = 'Convert array of numbers to a base system,' +
    'examples are binary, decimal, hexadecimal. ' +
    'Array of numbers, cannot contain a number, greater then the base.'
  var Base = function (b) {
    log.enter('Base', arguments)
    var base = Number(b) || 2 // binary as default
    this.getBase = function () { return base }
  }

  Base.prototype.arrToInt = function (arr) {
    log.enter('Base,arrToInt', arguments)
    var output = 0
    for (var i = 0; i < arr.length; i++) {
      output += arr[arr.length - (i + 1)] * Math.pow(this.getBase(), i)
    }
    return output
  }

  Base.prototype.intToArr = function (inp) {
    log.enter('Base.intToArr', arguments)
    var nr = Number(inp) || 0
    var b = this.getBase()
    var arrSize = Math.log(nr) / Math.log(b) + 1
    var arr = []
    for (var i = 0; i < arrSize; i++) {
      var curr = nr % Math.pow(b, i + 1)
      curr = Math.floor(curr / Math.pow(b, i))
      arr.unshift(curr)
      nr = nr - curr
    }
    return arr
  }

  SVL.set(['math', 'Base'], Base)
  SVL.set(['help', 'math', 'Base'], baseHelp)
}(typeof window !== 'undefined' ? window : global))
