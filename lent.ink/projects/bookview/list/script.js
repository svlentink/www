
function initIndex(obj){
  for (key in obj) {
    var elem = document.createElement('button')
    elem.innerText = key + ': ' + obj[key].toString()
    elem.setAttribute('onclick', 'viewChap('+key+')')
    document.querySelector('#index').appendChild(elem)
  }
}

function getImgWidth(){
  var margin = 5 //px
  var width = window.innerWidth
  var cols = parseInt(document.querySelector('#columns').value)
  var colwidth = Math.floor((width - (cols*(margin*2+2)) )/cols) // +2 just to allow a border of 1px on both sides
  return {px:colwidth,cols:cols}
}

function showPage(nr,showWhole){
  var w = getImgWidth().px *((showWhole)?2:1)
  elem.setAttribute('width',w)
}
function showPages(){
  var c = getImgWidth().cols
  var cont = document.querySelector('#pages')
  cont.innerHTML = ''
  var imgs = Book.getImages()
  cont.appendChild(imgs)
}


function viewChap(id){
  Book.pushChap(id)
  showPages()
}

function postLoadingHook() {
  var indx = Book.raw().index
  initIndex(indx)
}

