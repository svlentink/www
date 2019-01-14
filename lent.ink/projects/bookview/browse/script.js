var firstpage=2 // ignore preface

function nextPage(){
  var next = firstpage + 1
  showPages(next)
  firstpage = next
}
function prevPage(){
  var prev = firstpage -1
  showPages(prev)
  firstpage = prev
}

function showPages(page){
  var arr = Book.raw().pages
  var url = Book.pagesUrl
  var page1 = url + arr[page].file
  var page2 = url + arr[page+1].file
  document.querySelector('#first').setAttribute('src', page1)
  document.querySelector('#second').setAttribute('src', page2)
}


var postLoadingHook = function(){  
  showPages(firstpage)
}

