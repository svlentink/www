
/*
 * Allow custom CSS to be loaded
 */
function loadCss(url){
	if (! url) return
	let link = document.createElement('link')
	link.rel = 'stylesheet'
	link.type = 'text/css'
	link.href = url
	document.getElementsByTagName('HEAD')[0].appendChild(link)
}

function submitXhr(path, data, callback=console.log){
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
		callback(res)
	}
	xhr.open(method, path)
	xhr.send(data)
}

function redirect(url, data=undefined){
	if (data) {
		let form = document.createElement('form')
		form.style.display = 'none'
		form.action = url
		form.method = 'post'
		let inp = document.createElement('input')
		inp.type = 'text'
		inp.value = (typeof data === 'string') ? data : JSON.stringify(data)
		inp.name = "data"
		form.appendChild(inp)
		document.querySelector('body').appendChild(form)
		form.submit()
	} else window.location.href = url
}

export { loadCss, submitXhr, redirect }
