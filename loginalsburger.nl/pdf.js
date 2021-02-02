
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
		if (pdf.type !== 'rdw') return false
		return pdf.relateTo(this)
	}
	inConflict(pdf){
		return false
	}
}

class Duo extends Pdf {
}
class Inkomensverklaring extends Pdf {
}
class Rdw extends Pdf {
	relateTo(pdf){
		let t = pdf.type
		if (t === 'inkomensverklaring') {
			let this_bsn = this.getAttr('bsn')
			if (! this_bsn) {
				console.log('RDW pdf without bsn, which is needed to compare to inkomensverklaring')
				return false
			}
			let that_bsn = pdf.getAttr('bsn')
			return this_bsn === that_bsn
		}
		if (t === 'duo' || t === 'rdw'){
			let this_name = this.getAttr('name')
			let that_name = pdf.getAttr('name')
			return that_name.indexOf(this_name) !== -1
		}
		console.log('WARNING unknown pdf type',t)
		return false
	}
	inConflict(pdf){
		if (t !== 'rdw') return false
		// if both are RDW we need it to be the same person!
		return this.getAttr('name') !== pdf.getAttr('name')
	}
}


class Pdfs {
	constructor(arr){
		this.list = arr
	}
	field_native_to(key){
		let sources = {
			duo: ["education", "school", "edulevel", "birthdate", "birthyear", "graduationdate", "graduationyear"],
			inkomensverklaring: ["incomeyear", "annualincome"],
			rdw: ["bsn", "bsnend", "name", "address", "zipcode", "city", "country"]
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
		//FIXME also correlate inConflict and relatesTo

	}
}


