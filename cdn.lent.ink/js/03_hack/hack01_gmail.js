/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict'; var SVL = glob.SVL; var log = new SVL.log.Logger('hack01_gmail.js')

  var base2 = new SVL.math.Base(2)

  var Gmail = function (username, case_insensitive) {
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
    this.isCaseInsensitive = function () { return case_insensitive ? true : false }
  }

  Gmail.prototype.getLength = function () {
    log.enter('Gmail.getLength')
    var uname = this.getUsername()
    if (this.isCaseInsensitive()) return Math.pow(2, uname.length)
    // if the username has 4 chars, e.g. john
    // we can write all letters with upper or lower case
    // i.e. they are binary, which makes john possible to write in 2^4 ways.
    // For every char, we can place a dot in between; e.g. jo.h.n, j.o.hn etc.
    // which makes 2^(n-1)
    // and in the end, we have @gmail and @googlemail, which is 2^1
    // which brings us to:
    // 2^(amount of letters, no numbers) * 2^(username length, with numbers etc.)
    var letterCount = 0
    for (var i = 0; i < uname.length;i++) letterCount += uname[i].isLetter()

    return Math.pow(2, letterCount) * Math.pow(2, uname.length)
  }

  Gmail.prototype.getIndex = function (index) {
    log.enter('Gmail.getIndex', arguments)
    if (index >= this.getLength()) throw new Error()
    var arr = base2.intToArr(index)
    var domain = arr.pop() ? '@googlemail.com' : '@gmail.com' // domains .de and .fr redirect to gmail
    var uname = this.getUsername().split('')

    while (uname.length) {
      var char = uname.pop()
      // only when char is a letter, pop the Array
      if (!this.isCaseInsensitive() && char.isLetter() && arr.length && arr.pop()) char = char.toUpperCase()
      var dot = (arr.length && arr.pop()) ? '.' : ''

      domain = dot + char + domain
    }
    return domain
  }

  /**
  * Loop over email address and perform a function
  * @param {function} func Function with one argument; the current email
  * @param {int} delay (optional) Timeout in milisec
  * @param {int} offset (optional) From which int to start
  * @param {int} amount (optional) default is all possibilities
  */
  Gmail.prototype.forEach = function (func, delay, offset, amount) {
    log.enter('Gmail.foreach', {offset: offset, amount: amount})
    var dly = delay || 0
    var indx = offset || 0
    // check if amount is zero
    if (arguments.length > 3 && !amount) return

    if (indx >= this.getLength()) return
    var mail = this.getIndex(indx)

    func(mail) // preform the function
    var obj = this
    glob.setTimeout(function (obj) { // set delay for next interval
      if (amount) this.forEach(func, dly, indx + 1, amount - 1)
      else this.forEach(func, dly, indx + 1)
    }.bind(this), dly)
  }

  Gmail.exampleCode = function (uname) {
    if (!global) return log.error('Not on Node.js')

    var funcWithCookie = function (email) { /* Gets new cookie per request */
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
    
    var funcWithoutCookie = function (email) {
      var mail = glob.encodeURIComponent(email)
      var cookie = 'cookieconsent_status=dismiss'
      var headers = [
          'accept: */*',
          'x-requested-with: XMLHttpRequest',
          'user-agent: Mozilla/5.0 (X11; CrOS x86_64 12499.20.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.41 Safari/537.36',
          'content-type: application/x-www-form-urlencoded',
          'accept-encoding: gzip, deflate, br',
          'accept-language: en-US,en;q=0.9,en-NL;q=0.8,nl;q=0.7'
      ]
      var target = 'https://example.com/vote-form'
      var data = 'email=' + mail
      SVL.hack.cURL(target, data, cookie, true, headers)
    }

    var delay = 1000 * 60 * 20
    var gmail = new Gmail(uname, true)
    gmail.foreach(uname, funcWithCookie, delay)
  }

  SVL.set(['hack', 'Gmail'], Gmail)
}(typeof window !== 'undefined' ? window : global))

/*
Usage:
https://github.com/nodesource/distributions/blob/master/README.md#deb
./build.sh

cat << EOF >> bruteforcevote.js
var api = require('./SVL_all.min.js')
import api from './SVL_all.min.js';
SVL.hack.Gmail.exampleCode('johndoe')
EOF

node bruteforcevote.js
*/