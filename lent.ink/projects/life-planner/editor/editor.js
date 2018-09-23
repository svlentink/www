
function renderAll(obj) {
  document.data = obj
  var data = document.data
  renderpersonas('personas', data.personas.data)
  renderfoundation('foundation', data.foundation)
  renderroutines('routines', data.routines, data.activities)
  var tmmdata = tmmToOneFormat(data.tmm,data.timemanagementmatrix)
  rendertmm('tmm', tmmdata)
}

function loadURL() {
  var url = document.querySelector('#inputurl').value
  window.location.hash = '#' + url
  YAML.load(url,
//  $.getJSON("data.json",
  function(obj) {
    renderAll(obj)
  })
}

function loadinput() {
  var yamlinp = document.querySelector('#input').value
  localStorage.setItem('yaml',yamlinp)
  console.log('Saved to localstorage')
  var obj = YAML.parse(yamlinp)
  renderAll(obj)
}
