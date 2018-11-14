/* @license GPLv3 */
(function (glob) { // IIFE pattern
  'use strict';

  glob.renderroutines = function(elemid, routines, activities) {
    var cont = document.getElementById(elemid) //container
    cont.innerHTML = '' //reset
  
    function actionElem(act){
      var acont = document.createElement('li')
      acont.setAttribute('class', 'action')
      acont = glob.addDataAttributes(acont,act)
      
      var time = document.createElement('span')
      time.setAttribute('class', 'time')
      time.innerText = act['time'] || act['duration'] || 0
      timetotal += parseInt(time.innerText || 0)
      acont.appendChild(time)
      
      var title = document.createElement('span')
      title.setAttribute('class', 'title')
      title.innerText = actid || 'No_title_found'
      acont.appendChild(title)
      
      var desc = document.createElement('span')
      desc.setAttribute('class', 'desc')
      desc.innerText = act['desc'] || 'No_description_found'
      acont.appendChild(desc)
      return acont
    }
    var usedactivities = []
    for (var key in routines){
      var obj = routines[key]
      var rcont = document.createElement('article')
      rcont.setAttribute('class', 'routine')
      
      var tr = document.createElement('span')
      tr.setAttribute('class','trigger')
      tr.innerText = obj['trigger'] || 'No_trigger_found'
      rcont.appendChild(tr)
      
      var id = document.createElement('span')
      id.setAttribute('class', 'id')
      id.innerText = key
      rcont.appendChild(id)
      
      var desc = document.createElement('span')
      desc.setAttribute('class', 'desc')
      desc.innerText = obj['desc'] || 'No_description_found'
      //rcont.appendChild(desc)
      
      var actionscont = document.createElement('ul')
      actionscont.setAttribute('class', 'actions')
      var timetotal = 0
      
      for (var i in obj['actions'] || []){
        var actid = obj['actions'][i]
        usedactivities.push(actid)
        var act = (actid in activities)? activities[actid] : { title : actid }
        var acont = actionElem(act)
        actionscont.appendChild(acont)
      }
      rcont.appendChild(actionscont)
      
      var totaltime = document.createElement('span')
      totaltime.setAttribute('class', 'totaltime')
      totaltime.innerText = timetotal
      rcont.appendChild(totaltime)
      
      cont.appendChild(rcont)
    }
    var unusedacts = []
    for (var i in activities)
      if (! usedactivities.includes(i))
        unusedacts.push(i)
    var unused = document.createElement('div')
    unused.setAttribute('id','unplannedactivities')
    unused.innerText = 'Unplanned activities: ' + unusedacts.toString().replace(/,/g,' ')
    cont.appendChild(unused)
  }
  
  function eventsAsIcal(){
    if (! (glob.data && glob.data.routines) ) return console.log('no routines found')
    if (! glob.data.activities) return console.log('no activities found')

    var events = getEvents(glob.data.routines, glob.data.activities)
    glob.saveIcal(events)
  }
  document.querySelector('#icalbtn').addEventListener('click',eventsAsIcal)
  
  function getEvents(routines, activities){
    var events = []
    
    var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']
    function getFirstOccurrence(extraMinutes){
      for (var d = (new Date()).getDay(); d <= 14; d++){
        var day = days[d%7]
        if (day in start.days)
          return new Date(
            (new Date()).getYear(),
            (new Date()).getMonth(),
            (new Date()).getDate() + ((new Date()).getDay() - d),
            parseInt(start.time.split(':')[0]),
            parseInt(start.time.split(':')[1]) + (extraMinutes || 0)
          )
      }
    }

    for(var key in routines){
      var routine = routines[key]
      if (routine.start){
        var title = key
        if (routine.trigger) title += ' <= ' + routine.trigger

        var desc = []
        if (routine.desc) desc.push(routine.desc)
        var totaltime = 0
        if (routine.actions) for (var a in routine.actions) {
          if (activities[a]){
            var act = activities[a]
            var time = (act.time || act.duration || 0)
            totaltime += time
            var row = time + ' '
            row += a
            if (act.desc) row += ', ' + act.desc
            desc.push(row)
          } else {
            desc.push('0  ' + a)
          }
        }
        
        for (var s in routine.start){
          var start = routine.start[s]
          if (typeof start.days === 'string'){
            if (start.days.toLowerCase() === 'weekdays')
              start.days = ['mo', 'tu', 'we', 'th', 'fr']
            else // daily
              start.days = days
          }
          
          var event = {
            start: getFirstOccurrence(),
            end: getFirstOccurrence(totaltime),
            summary: title,
            description: desc.join('\n'),
            category: 'routine',
            //location: 'planet earth',
            //organizer: 'Some One <mail@some.one>',
            url: 'http://lent.ink/projects/life-planner',
            repeating: {
              freq: 'DAILY',
              byDay: start.days,
              count: start.days.length * 2 //two weeks
            }
          }
          events.push(event)
        }
      }
    }
  }

}(typeof window !== 'undefined' ? window : global))