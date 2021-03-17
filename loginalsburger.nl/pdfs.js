
function parse_pdf(inp){
	if (! inp || ! inp.parsed || ! inp.parsed.info) return false
	if (! inp.token) return false // no token means not valid
	let s = inp.parsed.info.src
	let token = inp.token
	if (s === 'rdw') return new Rdw(token)
	if (s === 'duo') return new Duo(token)
	if (s === 'inkomensverklaring') return new Inkomensverklaring(token)
	return false // unknown source
}

class AbstractPdf {
	constructor(token){
		this.token = token
		let arr = this.token.split('.')
		if (arr.length !== 3) return console.error('invalid token')
		let b64 = arr[1]
		let str = atob(b64)
		let obj = JSON.parse(str)
		this.data = obj
	}
	keys(){
		return Object.keys(this.data)
	}
	getAttr(key){
		return this.data[key]
	}
	includes(key){
		if ( this.getAttr(key) )
			return true
		return false
	}
	relateTo(pdf){
		if (pdf.getAttr('src') === 'rdw') return pdf.relateTo(this)
		return false
	}
	inConflict(pdf){
		return (
			this.getAttr('src') === pdf.getAttr('src') &&
			this.getAttr('name') !== pdf.getAttr('name')
		)
	}
	filter(keys){
		let result = {}
		for (let k in this.data)
			if(keys.includes(k)) result[k] = this.getAttr(k)
		return result
	}
	asCheckbox(fields, checked=true){
		let inp = document.createElement('input')
		let text = JSON.stringify( this.filter(fields) )

		inp.type = 'checkbox'
		inp.name = text
		inp.value = this.token
		inp.setAttribute("data-source", this.getAttr('src'))
		inp.checked = checked

		let lab = document.createElement('label')
		lab.for = this.token
		lab.innerText = text

		let br = document.createElement('br')

		let cont = document.createElement('div')
		cont.appendChild(inp)
		cont.appendChild(lab)
		cont.appendChild(br)
		return cont
	}
}

class Duo extends AbstractPdf {
}
class Inkomensverklaring extends AbstractPdf {
}
class Rdw extends AbstractPdf {
	relateTo(pdf){
		let s = pdf.getAttr('src')
		if (s === 'rdw') // multiple RDW pdfs are useless
			return false
		if (s === 'inkomensverklaring') {
			let this_bsn = this.getAttr('bsn')
			if (! this_bsn) {
				console.log('RDW pdf without bsn, which is needed to compare to inkomensverklaring')
				return false
			}
			let that_bsn = pdf.getAttr('bsn')
			return this_bsn === that_bsn
		}
		if (s === 'duo'){
			let this_name = this.getAttr('name')
			let that_name = pdf.getAttr('name')
			return that_name.indexOf(this_name) !== -1
		}
		console.warn('unknown pdf source',s)
		return false
	}
	inConflict(pdf){
		if (pdf.getAttr('src') !== 'rdw') return false
		// if both are RDW we need it to be the same person!
		return this.getAttr('name') !== pdf.getAttr('name')
	}
	invalid_timestamp(min_timestamp){
		let min = (new Date(min_timestamp)).toISOString()
		let now = (new Date()).toISOString()
		if (min > now)
			return "ERROR min_timestamp points to time in future"
		let pdf_time = (new Date(this.getAttr('timestamp'))).toISOString()
		if (min > pdf_time)
			return "INFO RDW pdf too old"
		return false
	}
}

/* Since the list of Pdfs stored in localstorage can hold pdfs of multiple people
 * the order is as follows:
 * 1 we want to have the last uploaded RDW pdf, if none found, user needs to be prompted
 * 2 correlate all other pdfs with this latest RDW pdf
 * 3 see if all desired fields are there
 * 4 return fields
 */
class Pdfs {
	constructor(arr, only_relevant_to_rdw_user=true){
		let result = []
		for (let p of arr) {
			let pdf = parse_pdf(p)
			if (pdf)
				result.push(pdf)
		}
		this.list = result
		if (! only_relevant_to_rdw_user){
			return
		}
		this.rdw = this.latest_rdw()
		if (! this.rdw){
			this.list = []
			return
		}
		let latest_rdw_user_pdfs = [this.rdw]
		for (let p of result)
			if (this.rdw.relateTo(p))
				latest_rdw_user_pdfs.push(p)

		this.list = latest_rdw_user_pdfs
	}
	field_native_to(key){
		let sources = {
			duo: ["education", "school", "edulevel", "birthdate", "birthyear", "graduationdate", "graduationyear"],
			inkomensverklaring: ["incomeyear", "annualincome"],
			rdw: ["bsn", "bsnend", "name", "address", "zipcode", "city", "country", "timestamp"]
		}

		for (let s in sources) if ( sources[s].includes(key) ) return s
		return false
	}
	fields_native_to(keys){
		let result = new Set()
		for (let key of keys){
			let s = this.field_native_to(key)
			if (s) result.add(s)
			else return console.error('requested field unknow:',f)
		}
		return result
	}
	fields_missing(desired_fields){
		let retrieved_fields = []
		for (let pdf of this.list)
			retrieved_fields = retrieved_fields.concat(pdf.keys())
		let missing_fields = []
		for (let needed of desired_fields)
			if (! retrieved_fields.includes(needed)) missing_fields.push(needed)
		return missing_fields
	}
	sources_missing(keys){
		return this.fields_native_to( this.fields_missing(keys) )
	}
	filter_by(field){
		return this.filter(p => {return p.includes(field)})
	}
	filter(func){
		let result = []
		for (let p of this.list)
			if (func(p))
				result.push(p)
		return result
	}
	get_raw(){
		let result = []
		for (let p of this.list)
			result.push(p.raw)
		return result
	}
	length(){
		return this.list.length
	}
	get_tokens(){
		let result = []
		for (let p of this.list)
			result.push(p.token)
		return result
	}
	get_token_sources(){
		let result = []
		for (let p of this.list)
			result.push( {src: p.getAttr('src'), token: p.token} )
		return result
	}
	latest_rdw(min_timestamp = '2021'){
		let latest
		let arr = this.filter_by('timestamp')
		for (let p of arr){
			if(! latest)
				latest = p
			if(latest.getAttr('timestamp') < p.getAttr('timestamp'))
				latest = p
		}
		if (! latest)
			return
		let err = latest.invalid_timestamp(min_timestamp)
		if (err)
			console.log(err)
		else
			return latest
	}
	next_needed(fields, min_timestamp){
		let needed = this.fields_native_to(fields)
		if(this.rdw && (
			fields.includes('bsn') ||
			fields.includes('bsnend') ||
			needed.has('inkomensverklaring')
			) && (! this.rdw.getAttr('bsn')) )
			this.rdw = undefined
		if(! this.rdw){
			if(fields.includes('bsn') || fields.includes('bsnend'))
				return 'rdw_bsn'
			if(needed.has('inkomensverklaring'))
				return 'rdw_inkomensverklaring'
			return 'rdw'
		}
		let missing = this.sources_missing(fields)
		if (missing)
			return missing.values().next().value
	}
	asCheckboxes(fields){
		let cont = document.createElement('div')
/*
		let hidden = document.createElement('input')
		hidden.style.display = 'none'
		hidden.name = 'fields'
		hidden.value = fields.join(',')
		cont.appendChild(hidden)
*/
		let count = {}
		for (let p of this.list){
			let s = p.getAttr('src')
			if (! s in count)
				count[s] = 0
			count[s] += 1
			cont.appendChild(p.asCheckbox(fields))
		}

		let scriptstr = ''
		for (let k in count)
			if(count[k] !== 1)
				scriptstr += 'document.querySelectorAll(\'[data-source="' + k + '"]\').forEach(x => {x.disabled = "disabled"});'
		let script = document.createElement('script')
		script.innerHTML = scriptstr
		cont.appendChild(script)

		return cont
	}
}

export { Pdfs }

