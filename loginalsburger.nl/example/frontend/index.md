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


## Available data

```
# Obtained from DUO
"name": "De heer Ali Bert Jansen"
"education": "GETUIGSCHRIFT WO Master Security and Network Engineering"
"school": "Universiteit van Amsterdam"
"level": "WO Master"
"birthdate": "1987-01-31"
"birthyear": 1987

# Obtained from RDW
"bsn": "123456789"
"bsnend" "6789"
"name": "Ali Bert Jansen"
"address": "Horst 10 99"
"zipcode": "1234AB"
"city": "Lelystad"
"country": "NEDERLAND"
"timestamp": "2020-07-09T07:05" #retrieved from PDF only for verification

# Obtained from belastingdienst
"datestamp": "2020-06-29" #retrieved from PDF but has no value
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


## Test data

Some people
[present](https://www.antwanvantilborgh.nl/wp-content/uploads/2019/03/Mbo-Commercieel-medewerker-Junior-Accountmanager.pdf)
their
[diploma](https://maartenpaauw.com/static/education/hogeschool-leiden-informatica-bachelor.pdf)
online,
which we can use for testing.


<script>
function one_stop_example(){
  let url = "https://loginalsburger.nl/"
  // specify where the service needs to return to:
  url += "?redirect=" + encodeURIcomponent("https://loginalsburger.nl/example/backend")
  // specify the needed fields:
  url += "&fields=" + encodeURIcomponent("bsnend,name,birthyear,education,annualincome")
  // optionally we specify our own CSS:
  //url += "&css=" + encodeURIcomponent("https://my-service.nl/custom.css")

}

</script>


