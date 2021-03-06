# Backend example

```javascript
const jwt = require('jsonwebtoken')
const request = require("request");
const http = require('http')

// The following retrieves the certificate used for validating tokens
let private_key
request({uri: "https://loginalsburger.nl/main.crt"}, 
	function(error, response, body) {
		if (error) return console.error(error)
    		public_key = body
	})
})

function process_token(received_token){
	try {
		var decoded = jwt.verify(received_token, public_key, {algorithm: 'RS256'})
		let parsed = JSON.parse(decoded)
		if ('data' in parsed){
			for (let pdf of parsed.data)
				if('timestamp' in pdf)
					console.log('Timestamp of RDW pdf', pdf.timestamp)
		} else return 'Unknown token format'
		return decoded
	} catch (err) {
		return err
	}
}

// The following simulates your custom application
const server = http.createServer((req, res) => {
	let data = '';
    req.on('data', chunk => {
        data += chunk
    })

	if(req.method.toLowerCase() !== 'post')
	    return res.end('ERROR not a post msg')
	if ( (! req.headers.origin) ||
	     (req.headers.origin.indexOf('//loginalsburger.nl') === -1 ) ) 
	        return res.end('ERROR unknown Origin')

    req.on('end', () => {
    	let received_token = data.replace('data=','')
    	let result = process_token(received_token)
        res.end(result)
    })
})
server.listen(3000)

```

The `public_key` refers to
[the certificate](https://loginalsburger.nl/main.crt)
this certificate could be redownloaded on a restart of your service,
but should NOT be fetched for every validation,
since it will slow down the user experience.

To explore an existing token, use
[jwt.io](https://jwt.io).


