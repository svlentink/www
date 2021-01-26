<title>Backend example</title>

```javascript
const jwt = require('jsonwebtoken')
var decoded = jwt.verify(received_token, public_key, { algorithm: 'RS256'})
```

The `public_key` refers to
[the certificate]()
this certificate could be redownloaded on a restart of your service,
but should NOT be fetched for every validation,
since it will slow down the user experience.


