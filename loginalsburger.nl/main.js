
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
	} else return display_msg("ERROR no 'redirect' in search params")
	if (! fields) return display_msg("ERROR no 'fields' in search params")
	if (css) loadCss(css)
	let retrieved_fields = getFields(fields)
	if (! retrieved_fields) return 
}

function getSetStorage(val, key="retrieved", default_val=[]) {
	val = val || localStorage.getItem(key) || default_val
	if (typeof val === "string") val = JSON.parse(val)
	localStorage.setItem(key,JSON.stringify(val))
	return val
}



function getFields(fields) {
	let fields_arr = fields.split(',')
	
	let retrieved = getSetStorage()
	console.log('FIXME needed fields',missing_fields)

	if (missing_fiels.length === 0) return 
	// FIXME
	// correlate bsn from inkomensverklaring with rdw
	// and name from duo with rdw
}

function display_msg(...rest) {
	let div = document.querySelector('.msg')
	if(! rest) {
		div.style.display = 'none'
		return
	}
	let msg = rest.join(' ')
	console.log(msg)
	div.style.display = 'block'
	div.innerText = msg
}

function submitForm(oFormElement,callback){
	if (! document.querySelector('input').value) return display_msg('ERROR no file selected')
	let xhr = new XMLHttpRequest()
	xhr.onload = function(){callback(xhr.responseText)}
	xhr.open(oFormElement.method, oFormElement.getAttribute("action"))
	xhr.send(new FormData(oFormElement))
	document.querySelector('.loader').style.display = 'block'
	display_msg()
	return false
}
function submitSign(oFormElement,callback){
	return console.log('FIXME submitsign')
	if (! document.querySelector('input').value) return display_msg('ERROR no file selected')
	let xhr = new XMLHttpRequest()
	xhr.onload = function(){callback(xhr.responseText)}
	xhr.open(oFormElement.method, oFormElement.getAttribute("action"))
	xhr.send(new FormData(oFormElement))
	document.querySelector('.loader').style.display = 'block'
	display_msg()
	return false
}


function pdfCallback(txt){
	let obj
	try {
		obj = JSON.parse(txt)
	} catch (err) {
		return display_msg(txt)
	}
	let arr = getSetStorage()
	arr.push(obj)
	getSetStorage(arr)
	console.log('Retrieved PDF, you can see it with getSetStorage()')
	document.querySelector('.loader').style.display = 'none'
	document.querySelector('input').value = ''
	display_msg()
	main()
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

