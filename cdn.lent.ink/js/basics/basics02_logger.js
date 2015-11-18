/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; var SVL = glob.SVL

  /**
   * Get time for logging
   * @param {Date} date (Optional) date
   */
  Date.getLogTime = function (datetime) {
    var date = datetime || new Date()
    return date.toTimeString().substring(0, 8) +
      '.' + date.getMilliseconds().preZeros(3)
  }

  var loggerHelp = 'How to use the SVL.log.Logger; ' +
    'var log = new SVL.log.Logger("packagex.foo"); And use ' +
    'log.enter("funcionX", arguments)'

  var logLevels = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE']
  var logLevelHelp =
    'Specifies the amount of messages you get ' +
    'with 0 being only errors.\nThe levels consist of; ' + logLevels
  var loggersHelp =
    'Array of functions that write the log messages ' +
    '(e.g. console, fileystem)'
  var appspecificHelp =
    'Implement application specific log info here. ' +
    'e.g. function(){return cookie.toString() + "/t" + userid}'

  var logMsg = function (level, path, desc, obj) {
    if (level > SVL.config.logLevel) return
    var lvl
    if (SVL.config.logLevel < logLevels.length) lvl = logLevels[level]
    else { // when logLevel exceeds the upperbound, just get the last one
      lvl = logLevels[logLevels.length - 1]
    }

    // send log message to all loggers
    var lggrs = SVL.config.loggers
    for (var i = 0; i < lggrs.length; i++) lggrs[i](lvl, path, desc, obj)
  }

  var genTextLog = function (level, path, desc, obj) {
    var appData = SVL.config.appSpecificLogMsg()
    var time = Date.getLogTime()
    var output = time + '\t' +
      level + '\t' +
      appData + '\t' +
      path + '\t' +
      desc + ' {'

    for (var prop in obj) if (obj.hasOwnProperty(prop)) {
      output += '\n\t' + prop + ' :\t' + obj[prop]
    }

    return output + ' }\n'
  }

  var logToConsole = function (level, path, desc, obj) {
    var lvl = level.toLowerCase()
    // chrome supports console.debug, node doesn't
    if (typeof console[lvl] !== 'function') lvl = 'log'
    console[lvl](genTextLog(level, path, desc, obj))
  }

  var buildDir
  var logToFilesystem = function (level, path, desc, obj) {
    console.log(
      'Using logToFilesystem, which is never tested, please debug first'
    )
    console.log(
      'Some of this code was used in an meteor app, using collectionFS'
    )

    if (!glob.fs) glob.fs = glob.Npm.require('fs') // needed for logging to filesystem
    if (!buildDir) {
      glob.ROOT_APP_SERVER = glob.fs.realpathSync('.')
      buildDir = glob.ROOT_APP_SERVER.split('/')
      buildDir.pop() // from server to programs
      buildDir.pop() // from programs to build
      buildDir = buildDir.join('/')
    }
    var date = new Date()
    var dateStamp = date.getFullYear() +
      '_' + date.getMonth() +
      '_' + date.getDate() +
      'T' + date.getHours() +
      date.toTimeString().substring(9, 17)
    var logFile = buildDir + '/' + dateStamp + '.log'
    var data = genTextLog(level, path, desc, obj)
    // https://nodejs.org/docs/latest/api/fs.html
    glob.fs.appendFile(logFile, data)
  }

  var Logger = function (path) {
    var pathStr = ''
    if (typeof path === 'object') { // e.g. ['SVL','chords','minor'] => 'SVL.chords.minor'
      for (var i = 0; i < path.length; i++) {
        if (typeof path[i] === 'string') pathStr += ((i === 0) ? '' : '.') + path[i]
        else console.log('Error in logger; path array contains non-string item.')
      }
    } else {
      if (typeof path === 'string') pathStr = path
      else console.log('No valid path provided, please provide, this is useful for debugging')
    }

    this.err = this.error
    this.getPath = function () { return pathStr }
  }

  Logger.prototype.trace = function (desc, obj) {
    logMsg(4, this.getPath(), desc, obj)
  }
  Logger.prototype.debug = function (desc, obj) {
    logMsg(3, this.getPath(), desc, obj)
  }
  Logger.prototype.enter = function (funcName, params) {
    logMsg(3, this.getPath(), 'Entering ' + funcName, params)
  }
  Logger.prototype.info = function (desc, obj) {
    logMsg(2, this.getPath(), desc, obj)
  }
  Logger.prototype.warn = function (desc, obj) {
    logMsg(1, this.getPath(), desc, obj)
  }
  Logger.prototype.error = function (desc, obj) {
    logMsg(0, this.getPath(), desc, obj)
  }

  SVL.log = {
    'Logger': Logger,
    'console': logToConsole,
    filesystem: logToFilesystem
  }

  // set default log level at INFO, when non existing, at SVL.config.logLevel
  SVL.set(['config', 'logLevel'], 2) // change to 3, to get DEBUG
  SVL.set(['help', 'config', 'logLevel'], logLevelHelp)
  // default array only contains logging to console
  SVL.set(['config', 'loggers'], [SVL.log.console])
  SVL.set(['help', 'config', 'loggers'], loggersHelp)
  var appspecificDefault = function () { return '' }
  SVL.set(['config', 'appSpecificLogMsg'], appspecificDefault)
  SVL.set(['help', 'config', 'appSpecificLogMsg'], appspecificHelp)
  SVL.set(['help', 'Logger'], loggerHelp)
}(typeof window !== 'undefined' ? window : global))
