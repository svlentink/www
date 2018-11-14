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
    if (! glob.saveAs) {
      console.log('Browser does not support window.saveAs()')
      return
    }
    ical.events = events
    var filename = 'routines.ical'
    glob.saveAs(cal.toString(),filename)
  }

}(typeof window !== 'undefined' ? window : global))
