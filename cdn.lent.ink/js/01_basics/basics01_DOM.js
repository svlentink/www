/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; var SVL = glob.SVL

  /**
   * Add preceeding zeros to an int
   * @param {int} charCount - the length it should be (e.g. 0023 == 4)
   */
  var preZeros = function (charCount) {
    var result = this.toString()
    while (result.length < charCount) result = '0' + result
    return result
  }
  SVL.set(['prototype', 'preZeros'], preZeros, 0, Number)

  // http://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
  var isLetter = function () {
    return this.length === 1 && Boolean(this.match(/[a-z]/i))
  }
  // To avoid the warning, by standardjs;
  // String prototype is read only, properties should not be added
  SVL.set(['prototype', 'isLetter'], isLetter, 0, String)

  var sumOfArr = function (arr) {
    var total = 0
    for (var i = 0; i < arr.length; i++) total += arr[i]
    return total
  }
  SVL.set(['prototype', 'sum'], sumOfArr, 0, Array)

  // process.on(‘uncaughtException’)
}(typeof window !== 'undefined' ? window : global))
