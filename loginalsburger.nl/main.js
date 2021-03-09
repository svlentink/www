import { Pdfs } from './pdfs.js'

function switchLanguage(lang){
	lang = lang.toLowerCase()
	let othlang = 'nl'
	if (lang === 'nl') othlang = 'en'
	for (let e of document.querySelectorAll('.'+lang))
		e.style.display = 'inline-block'
	for (let e of document.querySelectorAll('.'+othlang))
		e.style.display = 'none'
}
function setListeners(){
	for (let elem of document.querySelectorAll('.switchlang'))
		elem.onclick = function(){ switchLanguage(elem.innerText) }
	for (let elem of document.querySelectorAll('.reset_min_timestamp'))
		elem.onclick = function(){
			window.location.search = "?min_timestamp=" +
				(new Date()).toISOString().substr(0,16) +
				"&" +
				window.location.search.substr(1)
		}
	let form = document.querySelector('form')
	form.onsubmit = function(){ submitForm(form, pdfCallback);return false }
}
function main() {
	let params = (new URLSearchParams(window.location.search))
	let redirect = params.get('redirect')
	let fields = params.get('fields')
	let css = params.get('css')
	let min_timestamp = params.get('min_timestamp')
	if (redirect) {
		let label = redirect.split('//')[1].split('/')[0]
		for (let elem of document.querySelectorAll('.redirectdomain'))
			elem.innerText = label
	} else return display_msg("ERROR no 'redirect' in search params")
	if (! fields) return display_msg("ERROR no 'fields' in search params")
	setListeners()
	if (css) loadCss(css)
	let fields_arr = fields.split(',')
	let pdfs = getPdfs()
	console.debug('pdfs',pdfs)
	let next = pdfs.next_needed(fields_arr, min_timestamp)
	console.debug('next pdf',next)
	for (let e of ['rdw','rdw_bsn','rdw_inkomensverklaring','inkomensverklaring','duo','rdwname'])
		document.querySelectorAll('.'+e).forEach(x => {x.style.display = 'none'})
	if (!next)
		return console.log('FIXME all fields retrieved')
	document.querySelectorAll('.' + next).forEach(x => {x.style.display = 'block'})
	if (next.indexOf('rdw') !== -1){
		document.querySelectorAll('.rdw').forEach(x => {x.style.display = 'block'})
		return
	}
	document.querySelectorAll('.rdwname').forEach(x => {x.style.display = 'block'})
	document.querySelectorAll('.subjectname').forEach(x => {x.innerText = pdfs.rdw.getAttr('name')})
}

function getSetStorage(val, key="retrieved", default_val=[]) {
	val = val || localStorage.getItem(key) || default_val
	if (typeof val === "string") val = JSON.parse(val)
	localStorage.setItem(key,JSON.stringify(val))
	return val
}

function getPdfs() {
	let retrieved = getSetStorage()
	let pdfs = new Pdfs(retrieved)
	if (pdfs.length()){
		// If one of the tokens is old, we send it all off to see
		// if one of them is expired, this can happen when one
		// of the keys has been rotated
		// we then are able to purge the expired tokens
		let now = new Date()
		let hour_ago = now.setHours(now.getHours() -1)
		let unverified = pdfs.filter((p) => {
			if (! p.signature_verified_at) return false
			if( (new Date(p.signature_verified_at)).getTime() < hour_ago.getTime()) {
				return false
			}
			return true // we filter it since it is good to go
		})
		if (unverified.length)
			submitSign(unverified.get_tokens(), res => {
				//FIXME
				return console.log(res)
				main()
			})
	}
	return pdfs
}

function display_msg(...rest) {
	let div = document.querySelector('.msg')
	let msg = rest.join(' ')
	if(! msg) {
		div.style.display = 'none'
		return
	}
	console.log(msg)
	div.style.display = 'block'
	div.innerText = msg
	document.querySelector('.loader').style.display = 'none'
}

function submitForm(oFormElement,callback=pdfCallback){
	if (! document.querySelector('input').value) return display_msg('ERROR no file selected')
	let method = oFormElement.method
	let path = oFormElement.getAttribute("action")
	let data = new FormData(oFormElement)
	submitXhr(path, data, callback)
	document.querySelector('.loader').style.display = 'block'
	display_msg()
	return false
}
function submitSign(tokens,callback){
	return console.log('FIXME submitsign')
	submitXhr('/sign', JSON.stringify(tokens), callback)
}
function submitXhr(path, data, callback){
	let method = 'GET'
	if (data) method = 'POST'
	let xhr = new XMLHttpRequest()
	xhr.onload = function(){
		let res = xhr.responseText
		try {
			res = JSON.parse(res)
		}
		catch (e) {
			console.warn('Response not parseable',e)
		}
		if (callback) callback(res)
	}
	xhr.open(method, path)
	xhr.send(data)
}

function addToStorage(obj){
	let stamp = (new Date()).toISOString()
	obj.signature_verified_at = stamp
	let arr = getSetStorage()
	arr.push(obj)
	getSetStorage(arr)
	console.log('Retrieved PDFs can be seen with getSetStorage()')
}

function pdfCallback(obj){
	// check if parsing failed
	if (typeof obj === 'string') 
		return display_msg(obj)
	addToStorage(obj)

	document.querySelector('.loader').style.display = 'none'
	document.querySelector('input').value = ''
	display_msg()
	main()
}

function signCallback(){
	// the token retrieved from localStorage may be expired
	// thus we need to account for this possibility
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

