
class Pdf {
	constructor(inp){
		if (! inp || ! inp.parsed) return false
		for (let key in inp.parsed)
			this[key] = inp.parsed[key]
		if (! this.token) return false // no token means not valid
		if (! this.info) return false
		let t = this.info.type
		if (! t) return false
		this.type = t
		this.raw = inp
		if (t === 'rdw') return new Rdw()
		if (t === 'duo') return new Duo()
		if (t === 'inkomensverklaring') return new Inkomensverklaring()
		return false // unknown type
	}
	keys(){
		Object.keys(parsedToken().info)
	}
	isValidCert(){
		if(! this.certificates) return false
		let certs = this.certificates
		return (
			certs.authenticity &&
			certs.integrity &&
			certs.verified &&
			! certs.expired
		)
	}
	parsedToken(){
		let arr = this.token.split('.')
		if (arr.length !== 3) return console.error('invalid token')
		let b64 = arr[1]
		let str = atob(b64)
		let obj = JSON.parse(str)
		return obj
	}
	getAttr(key){
		let t = this.parsedToken()
		if (! t || ! t.info || ! t.info[key]) return
		return t.info.key[key]
	}
	relateTo(pdf){
		if (pdf.type === 'rdw') return pdf.relateTo(this)
		return false
	}
	inConflict(pdf){
		return (
			this.type === pdf.type &&
			this.getAttr('name') !== pdf.getAttr('name')
		)
	}
}

class Duo extends Pdf {
}
class Inkomensverklaring extends Pdf {
}
class Rdw extends Pdf {
	relateTo(pdf){
		let t = pdf.type
		if (t === 'rdw') // multiple RDW pdfs are useless
			return false
		if (t === 'inkomensverklaring') {
			let this_bsn = this.getAttr('bsn')
			if (! this_bsn) {
				console.log('RDW pdf without bsn, which is needed to compare to inkomensverklaring')
				return false
			}
			let that_bsn = pdf.getAttr('bsn')
			return this_bsn === that_bsn
		}
		if (t === 'duo'){
			let this_name = this.getAttr('name')
			let that_name = pdf.getAttr('name')
			return that_name.indexOf(this_name) !== -1
		}
		console.warn('unknown pdf type',t)
		return false
	}
	inConflict(pdf){
		if (t !== 'rdw') return false
		// if both are RDW we need it to be the same person!
		return this.getAttr('name') !== pdf.getAttr('name')
	}
	invalidate_timestamp(min_timestamp){
		let min = (new Date(min_timestamp)).toISOString()
		let now = (new Date()).toISOString()
		if (min > now)
			return "ERROR min_timestamp points to time in future"
		let pdf_time = (new Date(this.getAttr('timestamp'))).toISOString()
		if (min < pdf_time)
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
		for (let p in arr) {
			let pdf = new Pdf(p)
			if (pdf) result.push(pdf)
		}
		if (! only_relevant_to_rdw_user){
			this.list = result
			return
		}
		this.rdw = this.latest_rdw()
		if (! this.rdw){
			this.list = []
			return
		}
		let latest_rdw_user_pdfs = []
		for (let p in result)
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
		let result = Set()
		for (let key of keys){
			let s = field_native_to(key)
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
		for (let needed of desired_fiels)
			if (! retrieved_fields.includes(needed)) missing_fields.push(needed)
		return missing_fields
	}
	sources_missing(keys){
		return fields_native_to( fields_missing(keys) )
	}
	filter_by(field){
		return this.filter(p => {field in p})
	}
	filter(func){
		let result = []
		for (let p in this.list)
			if (func(p))
				result.push(p.raw)
		return new Pdfs(result)
	}
	get_raw(){
		let result = []
		for (let p in this.list)
			result.push(p.raw)
		return result
	}
	length(){
		return this.list.length
	}
	get_tokens(){
		let result = []
		for (let p in this.list)
			result.push(p.token)
		return result
	}
	latest_rdw(min_timestamp = '2021'){
		let latest
		let arr = filter_by('timestamp')
		for (let p in arr.list){
			if(! latest)
				latest = p
			if(latest.getAttr('timestamp') < p.getAttr('timestamp'))
				latest = p
		}
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
			needed.includes('inkomensverklaring')
			) && (! this.rdw.getAttr('bsn')) )
			this.rdw = undefined
		if(! this.rdw){
			if(fields.includes('bsn') || fields.includes('bsnend'))
				return 'rdw_bsn'
			if(needed.includes('inkomensverklaring'))
				return 'rdw_inkomensverklaring'
			return 'rdw'
		}
		let missing = this.sources_missing(fields)
		return missing.pop()
	}
}

export { Pdfs }
