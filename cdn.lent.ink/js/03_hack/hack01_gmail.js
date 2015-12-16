/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; var SVL = glob.SVL; var log = new SVL.log.Logger('hack01_gmail.js')

  var base2 = new SVL.math.Base(2)

  var Gmail = function (username) {
    if (typeof username !== 'string') throw new TypeError()
    log.enter('Gmail', arguments)
    // emails can contain +; e.g. userJohn+facebook@gmail.com can be handy to filter emails
    // yet, not many input forms accept +, ye I know, we need to educate web-devs!
    var uname = username.split('+')[0]
    // We also slice at @, just to be sure
    uname = uname.split('@')[0]
    // and remove the dots
    uname = uname.split('.').join('')

    uname = uname.toLowerCase()
    log.info('Created new gmail object', {username: uname})
    this.getUsername = function () { return uname }
  }

  Gmail.prototype.getLength = function () {
    log.enter('Gmail.getLength')
    // if the username has 4 chars, e.g. john
    // we can write all letters with upper or lower case
    // i.e. they are binary, which makes john possible to write in 2^4 ways.
    // For every char, we can place a dot in between; e.g. jo.h.n, j.o.hn etc.
    // which makes 2^(n-1)
    // and in the end, we have @gmail and @googlemail, which is 2^1
    // which brings us to:
    // 2^(amount of letters, no numbers) * 2^(username length, with numbers etc.)
    var uname = this.getUsername()
    var letterCount = 0
    for (var i = 0; i < uname.length;i++) letterCount += uname[i].isLetter()

    return Math.pow(2, letterCount) * Math.pow(2, uname.length)
  }

  Gmail.prototype.getIndex = function (index) {
    log.enter('Gmail.getIndex', arguments)
    if (index >= this.getLength()) throw new Error()
    var arr = base2.intToArr(index)
    var domain = arr.pop() ? '@googlemail.com' : '@gmail.com' // domains .de and .co redirect to gmail
    var uname = this.getUsername().split('')

    while (uname.length) {
      var char = uname.pop()
      // only when char is a letter, pop the Array
      if (char.isLetter() && arr.length && arr.pop()) char = char.toUpperCase()
      var dot = (arr.length && arr.pop()) ? '.' : ''

      domain = dot + char + domain
    }
    return domain
  }

  /**
  * Loop over email address and perform a function
  * @param {string} username
  * @param {function} func Function with one argument; the current email
  * @param {int} delay (optional) Timeout in milisec
  * @param {int} offset (optional) From which int to start
  * @param {int} amount (optional) default is all possibilities
  */
  Gmail.foreach = function (username, func, delay, offset, amount) {
    log.enter('Gmail.foreach', {offset: offset, amount: amount})
    var dly = delay || 0
    var indx = offset || 0
    // check if amount is zero
    if (arguments.length > 4 && !amount) return

    var gmail = new Gmail(username)
    if (indx >= gmail.getLength()) return
    var mail = gmail.getIndex(indx)

    func(mail) // preform the function
    glob.setTimeout(function () { // set delay for next interval
      if (amount) Gmail.foreach(username, func, dly, indx + 1, amount - 1)
      else Gmail.foreach(username, func, dly, indx + 1)
    }, dly)
  }

  Gmail.exampleCode = function (uname) {
    if (!global) return log.error('Not on Node.js')

    var func = function (email) {
      var mail = glob.encodeURIComponent(email)

      var target = 'http://website_i_brute_forced_in_the_past'
      var data = 'action=website_i_brute_forced_in_the_past&email=' + mail
      // second website
      data = 'survey=website_i_brute_forced_in_the_past&email=' + mail + '&email_tmp=' + mail + '&form_key='
      target = 'http://website_i_brute_forced_in_the_past'

      var formPage = 'http://website_i_brute_forced_in_the_past'
      // https://www.npmjs.com/package/xmlhttprequest
      var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
      var xhr = new XMLHttpRequest()

      xhr.onreadystatechange = function () {
        if (!(Number(xhr.readyState) === 4 && Number(xhr.status) === 200)) return
        var json = JSON.parse(this.responseText)
        var key = json.formkey
        var ckie = 'frontend=' + json.sid
        log.debug('got data back', json)

        SVL.hack.cURL(target, data + key, ckie, true)
      }
      xhr.open('GET', formPage)
      xhr.send()
    }

    var delay = 1000 * 15
    Gmail.foreach(uname, func, delay)
  }

  SVL.set(['hack', 'Gmail'], Gmail)
}(typeof window !== 'undefined' ? window : global))
