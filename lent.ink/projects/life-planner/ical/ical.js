/* @license GPLv3 */
//https://github.com/sebbo2002/ical-generator
import ical from 'ical-generator';

(function (glob) { // IIFE pattern
  'use strict';
  
  var cal = ical({
    domain: 'lent.ink',
    prodId: {company: 'lent.ink', product: 'Life-Planner'},
    name: 'exported-routines'
  })

  glob.saveIcal = function(events) {
    for (var i in events){
      var ev = events[i]
      cal.createEvent(ev)
    }
    var filename = 'routines.ical'
    if (glob.saveAs) return glob.saveAs(cal.toString(),filename)
    var icaloutput = document.querySelector('#icaloutput')
    icaloutput.setAttribute('style','display:block;')
    icaloutput.innerHTML = cal.toString()
  }

}(typeof window !== 'undefined' ? window : global))
