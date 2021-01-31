
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
	getFields(fields)
}

function getSetStorage(val, key="retrieved", default_val=[]) {
	val = val || localStorage.getItem(key) || default_val
	if (typeof val === "string") val = JSON.parse(val)
	localStorage.setItem(key,JSON.stringify(val))
	return val
}

function getFields(fields) {
	let sources = {
		duo: ["education", "school", "edulevel", "birthdate", "birthyear", "graduationdate", "graduationyear"],
		inkomensverklaring: ["incomeyear", "annualincome"],
		rdw: ["bsn", "bsnend", "name", "address", "zipcode", "city", "country"]
	}
	let all_fields = Object.values(sources).flat()
	let fields_arr = fields.split(',')
	for (let f of fields_arr) if (fields_arr.indexOf(f) === -1) return display_msg('ERROR requested field unknow:',f)
	
	let retrieved_fields = []
	let retrieved = getSetStorage()
	for (let pdf of retrieved){
		let info = pdf.parsed.info
		let in_it = Object.keys(info)
		retrieved_fields.concat(in_it)
	}
	let missing_fields = []
	for (let needed of fields_arr)
		if (retrieved_fields.indexOf(needed) === -1) missing_fields.push(needed)
	console.log('FIXME needed fields',missing_fields)
}

function display_msg(...rest) {
	let msg = rest.join(' ')
	console.log(msg)
	document.querySelector('.msg').innerText = msg
}

function submitForm(oFormElement,callback){
	let xhr = new XMLHttpRequest()
	xhr.onload = function(){callback(xhr.responseText)}
	xhr.open(oFormElement.method, oFormElement.getAttribute("action"))
	xhr.send(new FormData(oFormElement))
	document.querySelector('.loader').style.display = 'block'
	display_msg('')
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
	document.querySelector('.loader').style.display = 'none'
	document.querySelector('input').value = ''
	display_msg('')
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

