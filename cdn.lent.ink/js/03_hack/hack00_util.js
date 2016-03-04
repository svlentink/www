/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; var SVL = glob.SVL; var log = new SVL.log.Logger('hack00_util.js')

  var randomIp = function () {
    log.enter('randomIp')
    return glob.parseInt(glob.Math.random() * 256) +
      '.' + glob.parseInt(glob.Math.random() * 256) +
      '.' + glob.parseInt(glob.Math.random() * 256) +
      '.' + glob.parseInt(glob.Math.random() * 256)
  }
  SVL.set(['hack', 'randomIp'], randomIp)

  var execBash = function (cmd, callback) {
    log.enter('execBash', {cmd: cmd})
    // https://dzone.com/articles/execute-unix-command-nodejs
    var sys = require('sys')
    var exec = require('child_process').exec
    function puts (error, stdout, stderr) {
      sys.puts(stdout)
      log.debug('bash', {err: error, stdout: stdout, stderr: stderr})
      if (callback) callback(stdout)
    }
    exec(cmd, puts)
  }
  SVL.set(['hack', 'execBash'], execBash)

  /**
  * execute the curl command as in terminal
  * To get the data string:
  *   When you use the network tab in the Chrome browser,
  *   you can see which post value a page sends.
  *   If you click on the Form Data; view source
  * @param {string} target URL
  * @param {string} formPostdata (optional) datastring
  * @param {string} cookie (optional)
  * @param {boolean} hasRandomIp (optional)
  * @param {function} callback (optional)
  */
  var cURL = function (target, formPostData, cookie, hasRandomIp, callback) {
    log.enter('cURL', {target: target, data: formPostData})
    // http://unix.stackexchange.com/questions/167077/sending-curl-request-with-custom-ip
    var ip = hasRandomIp ? ' --header "X-Forwarded-For: ' + randomIp() + '" ' : ''
    var data = formPostData ? ' --data "' + formPostData + '" ' : ''
    var cook = cookie ? ' --cookie "' + cookie + '" ' : ''

    var bashCMD = 'curl ' + ip + data + cook + target
    execBash('echo "' + encodeURI(bashCMD) + '" > /tmp/last_curl_from_nodejs.txt')
    execBash(bashCMD, callback)
  }
  SVL.set(['hack', 'cURL'], cURL)
  
  /**
  * Look through an object and find a word
  * This can be useful in browser for debugging or hacking
  * e.g. search for 'ads', to locate adversitement and block it with js
  * @param {string} str Search term (case insensitive)
  * @param {int} maxDepth
  * @param {object} obj (optional) default = window
  */
  var treeSearcher = function (str, maxDepth, obj) {
    if (!obj && window) obj = window // when non is given
    else if (typeof obj !== 'object' && typeof obj !== 'function') return // can we search it?
    if (!(typeof str === 'string' && str.length)) return // valid identifier
    if (!maxDepth) return // stop at zero
    var currPath = arguments[3] || '' // fourth argument is used for recursive looping
  
    for (var key in obj) {
      if(!obj.hasOwnProperty(key)) { console.log(currPath + '.' + key + ' is not own prop'); break}
      if (key.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
        log.debug('Found: ' + currPath + '.' + key + ' (not going deeper in this path)', obj[key])
      } else treeSearcher(str, maxDepth - 1, obj[key], currPath + '.' + key)
    }
  }
  SVL.set(['hack', 'treeSearcher'], treeSearcher)
  
}(typeof window !== 'undefined' ? window : global))
