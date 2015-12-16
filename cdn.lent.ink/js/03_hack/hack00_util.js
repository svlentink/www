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
}(typeof window !== 'undefined' ? window : global))
