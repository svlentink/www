

function renderroutines(elemid, routines, activities) {
  var cont = document.getElementById(elemid) //container
  cont.innerHTML = '' //reset

  function actionElem(act){
    var acont = document.createElement('li')
    acont.setAttribute('class', 'action')
    acont = addDataAttributes(acont,act)
    
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

