/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; if (!glob.SVL) glob.SVL = {}; var SVL = glob.SVL

  /**
   * Sets a value (e.g. number, function) at a specific point
   * E.g. SVL.set(['lorem','ipsum'],42) will place 42 at SVL.lorem.ipsum
   * and creates lorem when it does not exists
   * @param {Array} pathArr Array of strings
   * @param {} value Anything you like
   * @param {boolean} force (optional) set to true when you would overwrite
   */
  SVL.set = function (pathArr, value, force) {
    var src, path, val, frc
    if (arguments.length < 4) { // 2 or 3
      src = SVL
      path = arguments[0]
      val = arguments[1]
      frc = arguments[2]
    } else { // 4 arguments
      src = arguments[3]
      path = arguments[0]
      val = arguments[1]
      frc = arguments[2]
    }
    var next = path.shift()
    if (path.length === 0) {
      if (typeof src !== 'object' &&
        typeof src !== 'function') return console.log(src + ' should be an object or function')
      if (src[next] && // check if already there
        !frc) return false// when already there, but no force, do nothing

      src[next] = val
      return true
    }

    if (!src[next]) src[next] = {}

    return SVL.set(path, val, frc, src[next])
  }
}(typeof window !== 'undefined' ? window : global))
