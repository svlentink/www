/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; var SVL = glob.SVL; var log = new SVL.log.Logger('util01_matrices.js')

  /*
  You may think, what is this file for?
  I don't know either, it was a side project a while ago,
  for which I needed this to simulate things
  */

  /**
    * Generates a multi dimensional matrix
    * e.g. When you input 2, you'll get a nested array with a total of 2^2 elements
    * e.g. Four will give you 4^4 elements
    * @param {int} dim Dimensions
    * @param {boolean} isBinary (optional)
    */
  function genMM (dim, isBinary) {// generateMultidimensionalMatirx
    log.enter('genMM', arguments)
    var nr = 0
    function getElem (size, depth) {// generates a multidimension array
      var arr = []
      if (depth <= 1) for (var i = 0; i < size; i++) arr.push(isBinary ? nr++ % 2 : nr++)
      else for (var i2 = 0; i2 < size; i2++) arr.push(getElem(size, depth - 1))
      return arr
    }
    return getElem(dim, dim)
  }
  SVL.set(['help', 'math', 'matrices', 'genMM'], 'Generates a multi dimension matrix')
  SVL.set(['math', 'matrices', 'genMM'], genMM)

  var m2sHelp = 'Converts a nested stucture of arrays to a single dimension array'
  /**
    * @param {Object} m Matrix
    */
  function multi2single (m) {// multidimentionalMatrix2singleDimArr
    log.enter('multi2single', m)
    if (!(typeof m === 'object' && m.length)) return m // not an array or length zero
    var arr = []
    for (var i = 0; i < m.length; i++) {
      if (typeof m[i] === 'object') arr = arr.concat(multi2single(m[i]))
      else arr.push(m[i])
    }
    return arr
  }
  SVL.set(['help', 'math', 'matrices', 'multi2single'], m2sHelp)
  SVL.set(['math', 'matrices', 'multi2single'], multi2single)

  var s2mHelp = 'Convert a single dimension array to a multi dimensional nested array'
  /**
    * @param {Array} arr input array
    * @param {Number} d Dimensions
    */
  function single2multiple (arr, d) {
    log.enter('single2multiple', arguments)
    var a = arr || []
    var m = genMM(d) // create a structure with will hold the values
    var lim = Math.pow(d, d) // set max, to prevent index out of bound exceptions
    var base = new SVL.math.Base(d)
    for (var i = lim - 1; i >= 0; i--) {
      var tmp = [] // creating current vector
      var coords = base.intToArr(i)
      // the next step is to make sure the coords have the right amount of numbers
      for (var j = 0; j < d; j++) tmp.unshift(coords.pop() || 0) // the array could be small if the nr is small
      // the temp now has become the array with coords
      setPosMM(m, tmp, a.pop() || 0)
    }
    return m
  }
  SVL.set(['help', 'math', 'matrices', 'single2multiple'], s2mHelp)
  SVL.set(['math', 'matrices', 'single2multiple'], single2multiple)

  var getPosMMHelp = 'Get the position in a multi dimensional array'
  /**
    * @param {Array} m Matrix
    * @param {Array} coords Array containing the desired location in the array
    */
  function getPosMM (m, coords) {
    log.enter('getPosMM', arguments)
    if (coords.length && typeof m[coords[0]] !== undefined) {
      return getPosMM(m[coords.shift()], coords)
    } else return m
  }
  SVL.set(['help', 'math', 'matrices', 'getPosMM'], getPosMMHelp)
  SVL.set(['math', 'matrices', 'getPosMM'], getPosMM)

  var setPosMMHelp = 'Set the position in a multi dimensional array'
  /**
    * @param {Array} m Matrix
    * @param {Array} coords
    * @param {} val The value you want at that coordinate
    */
  function setPosMM (m, coords, val) {
    log.enter('setPosMM', arguments)
    if (coords.length === 1) m[coords.shift()] = val
    else if (coords.length && typeof m[coords[0]] !== undefined) {
      setPosMM(m[coords.shift()], coords, val)
    } else return false
  }
  SVL.set(['help', 'math', 'matrices', 'setPosMM'], setPosMMHelp)
  SVL.set(['math', 'matrices', 'setPosMM'], setPosMM)

  /**
    * In an excel sheet (2d) you can have a total of the rows and of the columns,
    * - For every dimension, we have a vector with totals. (i.e. 3d gives 3 vectors)
    * In this 2d plane, to calculate the totals of the row in the end column,
    * you'll need to use all the digits in the plane to calculate the row totals.
    * The same applies to the column totals, you'll again use all the digits in the plane.
    * This brings us to a universal rule that applies also to nd matrices (n \in N)
    * - A vector is valid if and only if it takes every element of the matrix into account once.
    * Another fact we derive from this is the amount of elements there are take into account
    * for every element in the vector; d^(d-1) where d is the amount of dimensions.
    *
    * Example; 3d = 3^3 = 27 elems.
    * We get the first vector by iterating over x (x,a,b)
    * The first element of the first vector is given by;
    * [0,0,0], [0,0,1], [0,0,2], [0,1,0], [0,1,1], [0,1,2], [0,2,0], [0,2,1], [0,2,2]
    * this nine elements are combined to form the first element of the first vector.
    * The second element from the first vector is the same row, but the first zero becomes a one.
    * For the next dimension, we fix the second element of the arrays and iterate over the first and last.
    */
  function getTotalVectorsMM (m) {
    log.enter('getTotalVectorsMM', m)
    var vectors = []
    var d = m.length // dimension
    var base = new SVL.math.Base(d)
    var vspq = Math.pow(d, d - 1) // vector single position quatity

    function createVector (v, d) {
      log.enter('createVector', arguments)
      var vec = []
      for (var i = 0; i < d; i++) vec.push(getVectorPosition(m, v, i))
      log.debug('created vector', vec)
      return vec
    }
    /**
      * @param {object} m Matrix
      * @param {object} v Which vector
      * @param {object} p Which position of that vector
      */
    function getVectorPosition (m, v, p) {
      log.enter('getVectorPosition', arguments)
      var total = 0
      for (var i = 0; i < vspq; i++) {
        var tmp = []
        var nr = base.toIntArr(i)
        for (var j = 0; j < d; j++) {
          if (j === v) tmp.unshift(p)
          else tmp.unshift(nr.pop() || 0)// the array could be small, when number is small
        }
        total += getPosMM(m, tmp)
      }
      return total
    }

    for (var i = 0; i < d; i++) vectors.push(createVector(i, d))
    return vectors
  }
  SVL.set(['math', 'matrices', 'getTotalVectorsMM'], getTotalVectorsMM)
}(typeof window !== 'undefined' ? window : global))
