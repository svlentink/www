<title>Frontend example</title>

Depending on which fields are requested from the user,
one or more PDFs need to be uploaded by the user.

At least the PDF of RDW is needed,
since that one is needed since it authenticates the user
(it is the only one with a timestamp on it,
which allows LoginAlsBurger to check if the PDF was retrieved recently)

<!--
| field | also includes | additional pdf |
| --- | --- | --- |
| city | country | |
| zipcode | city | |
| address | zipcode | |
| name | | |
| bsn | | |
| birthdate | | DUO |
| edu |  | DUO |
-->

## Timestamp

There are two ways the info from LoginAlsBurger can be used;
to validate details of a person
(e.g. if person X indeed has done education Y)
and/or to authenticate a person
(e.g. person X has done education Y, but is also person X).

In the case LoginAlsBurger is used to authenticate a person,
`timestamp`, which is always provided,
[MUST](https://tools.ietf.org/html/rfc2119)
be stored by your service and checked.

Some dummy code:
```
received_userid, received_timestamp = request_from_loginalsburger.parse()
last_known_timestamp = dummy_sql_select(received_userid)
if (last_known_timestamp == received_timestamp)
	return 'All good, authenticate user'
if (last_known_timestamp < received_timestamp)
	dummy_sql_update(received_userid, received_timestamp)
	return 'All good, user just used more recent PDF document'
if (last_known_timestamp > received_timestamp)
	return 'NOT good, it could be that the user used a different browser with an old PDF in localStorage'

```

## Available data

<!--
# Obtained from DUO
"name": "De heer Ali Bert Jansen"
"education": "GETUIGSCHRIFT WO Master Security and Network Engineering"
"school": "Universiteit van Amsterdam"
"edulevel": "WO Master" #NOTE, we are NOT able to deduce this field for every diploma
"birthdate": "1987-01-31"
"birthyear": 1987
"graduationdate": "2009-01-31"
"graduationyear": 2009

# Obtained from RDW
"bsn": "123456789"
"bsnend" "6789"
"name": "Ali Bert Jansen"
"address": "Horst 10 99"
"zipcode": "1234AB"
"city": "Lelystad"
"country": "NEDERLAND"
"timestamp": "2020-07-09T07:05" #we use this to determine if the user is the one who dowloaded the pdf

# Obtained from belastingdienst
"datestamp": "2020-06-29" #retrieved from PDF but has no value
"incomeyear": 2019
"name": "A B Jansen"
"annualincome": 12345
"bsn": "123456789"
-->

```
# Obtained from DUO
"name": "De heer Ali Bert Jansen"
"education": "GETUIGSCHRIFT WO Master Security and Network Engineering"
"school": "Universiteit van Amsterdam"
"edulevel": "WO Master" #NOTE, we are NOT able to deduce this field for every diploma
"birthdate": "1987-01-31"
"birthyear": 1987
"graduationdate": "2009-01-31"
"graduationyear": 2009

# Obtained from RDW
"bsn": "123456789"
"bsnend" "6789"
"name": "Ali Bert Jansen"
"address": "Horst 10 99"
"zipcode": "1234AB"
"city": "Lelystad"
"country": "NEDERLAND"
"timestamp": "2020-07-09T07:05" #we use this to determine if the user is the one who dowloaded the pdf

# Obtained from belastingdienst
"incomeyear": 2019
"name": "A B Jansen"
"annualincome": 12345
"bsn": "123456789"
"bsnend" "6789"
```

We intentionally picked an
[address](https://nl.wikipedia.org/wiki/Huisnummer#Afwijkende_adresseringen).
where the name of the street ends with a number, followed by the house number.

The `bsnend` was added as an option,
since a company might not need the full `bsn`
but does need to avoid having a duplicate of a common name (e.g. Jan Jansen).
The same goes for `birthyear` as opposed to `birthdate`,
since it is best to get the least amount of data that is needed.

Since the browser can hold user details in `localStorage`,
the `timestamp` can be used if for some reason one has
to be sure the data is recent (like the use case with residents).

## Example form

Your website that redirect to LoginAlsBurger
[MUST](https://tools.ietf.org/html/rfc2119)
explain every field it requests
and
[why it needs](https://en.wikipedia.org/wiki/Need_to_know)
it.
Requesting
[everything](https://loginalsburger.nl?redirect=https://loginalsburger.nl/example/backend&fields=education,school,edulevel,birthdate,birthyear,graduationdate,graduationyear,incomeyear,annualincome,bsn,bsnend,name,address,zipcode,city,country,timestamp)
should only be done during debugging.


```

<script>
function onclick_example(){
  let url = "https://loginalsburger.nl/"

  // specify where the service needs to return to:
  url += "?redirect=" + encodeURIComponent("https://loginalsburger.nl/example/backend")

  // specify the needed fields:
  url += "&fields=" + encodeURIComponent("name,education,graduationyear,city")

  // optionally, provide the current timestamp that you have of this user in the DB, if applies
  //url += "&min_timestamp=" + encodeURIComponent("2020-07-09T07:05")

  // optionally we specify our own CSS:
  //url += "&css=" + encodeURIComponent("https://my-service.nl/custom.css")

  window.open(url,"new_window")
}
</script>

We will now redirect you to LoginAlsBurger,
where you can follow the steps presented,
after which we ONLY get your;
'name', 'education', 'graduationyear' and 'city',
which we literally copy to your job profile on our website.

<button onclick="onclick_example()">Continue to LoginAlsBurger</button>
```
