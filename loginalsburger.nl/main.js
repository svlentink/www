
function switchlanguage(lang){
	let othlang = 'nl'
	if (lang === 'nl') othlang = 'en'
	for (let e of document.querySelectorAll('.'+lang))
		e.style.display = 'inline-block'
	for (let e of document.querySelectorAll('.'+othlang))
		e.style.display = 'none'
}
function main() {
	let params = (new URLSearchParams(window.location.search))
	let redirect = params.get('redirect')
	let fields = params.get('fields')
	let css = params.get('css')
	if (redirect) {
		let label = redirect.split('//')[1].split('/')[0]
		document.querySelector('#redirect').innerText = label
	} else return console.error("No 'redirect' in search params")
	if (! fields) return console.error("No 'fields' in search params")
	if (css) loadCss(css)
}

function submitForm(oFormElement,callback){
  let xhr = new XMLHttpRequest()
  xhr.onload = function(){callback(xhr.responseText)}
  xhr.open(oFormElement.method, oFormElement.getAttribute("action"))
  xhr.send(new FormData(oFormElement))
  return false
}

function pdfCallback(txt){
	let obj
	try {
		obj = JSON.parse(txt)
	} catch (err) {
		return alert(txt)
	}
	document.data = obj
	console.log('FIXME see document.data')
}

function signCallback(){
	
}

/*
 * Allow custom CSS to be loaded
 */
function loadCss(url){
	if (! url) return
	let link = document.createElement('link')
	link.rel = 'stylesheet'
	link.type = 'text/css'
	link.href = href
	document.getElementsByTagName('HEAD')[0].appendChild(link)
}

main()

