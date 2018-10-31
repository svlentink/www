
// everything that is a string will be added as data attribute
function addDataAttributes(elem,obj) {
  for (var key in obj){
    var val = obj[key]
    var attr = 'data-' + key.toLocaleLowerCase() //https://www.w3schools.com/tags/att_global_data.asp
    if (typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean') elem.setAttribute(attr, val)
  }
  elem.setAttribute('title',JSON.stringify(obj,null,2))
  return elem
}

function hideinfo() {
  var infos = document.getElementsByClassName('info')
  for (var i in infos)
    infos[i].setAttribute('style','display:none;')
}

console.log('Start loading page from YAML')
var hash = window.location.hash
if (hash && hash.substr(0,5) === '#http') {// enables sharing with url
  console.log('Found url in hash of url, using it to load yaml')
  document.querySelector('#inputurl').value = hash.substr(1)
  loadURL()
} else if (localStorage.getItem('yaml')) {
  console.log('Found content in localstorage, using it')
  document.querySelector('#input').value = localStorage.getItem('yaml')
  loadinput()
} else loadURL() // use default value in inputfield
