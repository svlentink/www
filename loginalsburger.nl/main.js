import { Pdfs } from './pdfs.js'

function go_back(reason){
	console.error('redirecting',reason)
	let query = '?redirect=http://www.example.C0M&fields=name'
	window.location.search = query
}

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
	let pdfform = document.querySelector('#pdfform')
	pdfform.onsubmit = function(){ submitForm(this, pdfCallback);return false }
	let signform = document.querySelector('#signform')
	signform.onsubmit = function(){
		let checkeds = []
		let sources = []
		let fields
		for (let inp of this)
			if(inp && 'name' in inp){
				if('checked' in inp && inp.checked){
					let src = inp.dataset.source
					checkeds.push({ token: inp.value, src: src })
					sources.push(src)
				}
				//if (inp.name === 'fields')
				//	fields_arr = inp.value.split(',')
			}
		main(checkeds)
		return false
	}
}
function main(result=false) {
	let params = (new URLSearchParams(window.location.search))
	let redirect = params.get('redirect')
	let fields = params.get('fields')
	let css = params.get('css')
	let min_timestamp = params.get('min_timestamp')
	if (redirect && redirect.indexOf('//') !== -1) {
		let label = redirect.split('//')[1].split('/')[0]
		for (let elem of document.querySelectorAll('.redirectdomain'))
			elem.innerText = label
	} else return go_back("ERROR no (valid) 'redirect' in search params")
	if (! fields) return go_back("ERROR no 'fields' in search params")
	setListeners()
	if (css) loadCss(css)
	let fields_arr = ('timestamp,' + fields).split(',') //timestamp is always provided for security reasons
	let pdfs = getPdfs()
	console.debug('pdfs',pdfs)
	let next = pdfs.next_needed(fields_arr, min_timestamp)
	console.debug('next pdf',next)
	for (let e of ['rdw','rdw_bsn','rdw_inkomensverklaring','inkomensverklaring','duo','rdwname'])
		document.querySelectorAll('.'+e).forEach(x => {x.style.display = 'none'})
	if (!next){
		document.querySelectorAll('.upload').forEach(x => {x.style.display = 'none'})
		document.querySelectorAll('.confirm').forEach(x => {x.style.display = 'block'})
		if(result){
			fields_arr.push('src')
			return submitSign(fields_arr, result, redirect, res => {
				if(typeof res !== 'object' || ! 'token' in res)
					return console.warn('This could happen if the keys to sign the tokens have been rotated',res)
				console.debug(res)
				let href = redirect + '?token=' +res.token
				window.location.href = href
			})
		}
		let container = document.querySelector('#checkboxes')
		let boxes = pdfs.asCheckboxes(fields_arr)
		container.appendChild(boxes)
		return
	}
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
	let pdfs = new Pdfs(retrieved,false)
	if (pdfs.length()){
		// If one of the tokens is old, we send it all off to see
		// if one of them is expired, this can happen when one
		// of the keys has been rotated
		// we then are able to purge the expired tokens
		let now = new Date()
		let hour_ago = now.setHours(now.getHours() -1)
		let unverified = pdfs.filter(p => {
			if (! p.signature_verified_at) return false
			if( (new Date(p.signature_verified_at)).getTime() < hour_ago.getTime()) {
				return false
			}
			return true // we filter it since it is good to go
		})
		if (unverified.length)
			submitSign(['name'], unverified.get_token_sources(), 'validation_check', res => {
				console.debug(res)
				main()
			})
	}
	return new Pdfs(retrieved)
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
function submitSign(fields, tokens, subject='missing_subject', callback=console.debug){
	let data = {
		subject: subject,
		data: tokens,
		keys: fields
	}
	console.debug('submitsign', data)
	submitXhr('/sign/', JSON.stringify(data), (res) => {
	// the token retrieved from localStorage may be expired
	// thus we need to account for this possibility
		try{
			if (typeof res !== 'object') return console.error('Error parsing signing',res)
			if ('token' in res) return callback(res)
			if ('invalid' in res){
				let still_valid = []
				let items = getSetStorage()
				for (let i of items){
					if (res.invalid.includes(i.token))
						console.debug('removing invalid token',i)
					else
						still_valid.push(i)
				}
				getSetStorage(still_valid)
			}
			else console.warn('Unknown format',res)
		} catch (e) {
			console.error('Parse error',data,e)
		}
		main()
	})
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
			console.warn('Response not parseable',res,e)
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
}

function pdfCallback(obj){
	// check if parsing failed
	if (typeof obj === 'string') 
		return display_msg(obj)
	addToStorage(obj)

	document.querySelector('.loader').style.display = 'none'
	document.querySelector('input').value = ''
	if ('parsed' in obj && 'info' in obj.parsed && typeof obj.parsed.info === 'object' && obj.parsed.info.uploaded_outside_timeframe)
		display_msg('Geupload buiten tijdskader / uploaded outside timeframe')
	else
		display_msg()
	main()
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

