<title>Use case examples</title>

# Use case examples

This page lists some example use cases of the LoginAlsBurger.nl service.

## Postal service

#### Problem statement
Usually a postal/package delivery service cannot validate that someone is living
and or present at a specific address.
Usually you get a card in the mailbox when you missed a delivery opportunity.

Even worse, when ordering a package from a foreign country,
one can usually not list the preference to not be delivered at home,
but as a pickup point.
This will result in a wasteful attempt at the package delivery
as well as an increased time before it will end up at the pickup point.

This service will enable a delivery company to validate that someone
is living at an address at that specific point in time.

#### Outline potential solution

The delivery company could say implmenent the following business use case;
We allow anyone to set the out-of-house times and or preferences for the address
someone is listed on at that specific point in time.

This will result in the customer being able to specify preferences
and after moving, a new resident on that address can overwrite the old preferences by setting new ones.

#### Potential issues

When two or more people are located on the same address and do not agree on the schedule,
they both could change the schedule within a week.
The delivery company could invalidate any schedule on an address if various people
change it within X time frame and block setting a new one for Y time frame.

#### Expected fields

```
"name": "Ali Bert Jansen"
"address": "Horst 10 99"
"zipcode": "1234AB"
"city": "Lelystad"
"country": "NEDERLAND"
```
This example use case would request the address details
(potentially only the `address` and `zipcode`)
together with the name of the resident,
to distinguish between residents.

## Recruitement

Instead of doing manual diploma validation,
one could use LoginAlsBurger.nl.

#### Expected fields

```
"name": "De heer Ali Bert Jansen"
"education": "GETUIGSCHRIFT WO Master Security and Network Engineering"
"school": "Universiteit van Amsterdam"
"level": "WO Master"
"birthdate": "1987-01-31"
```
The `birthdate` or it might not.


## Proof of vaccination

When the proof of vaccination will be
[downloadable in March](https://nos.nl/collectie/13850/artikel/2360888-rivm-vaccinatiebewijs-is-pas-eind-maart-te-downloaden-niet-eind-januari),
this service might include it.

We understand that people at risk want to be vaccinated
and that healthy people don't see the need for it when
all people at risk are already protected.
We respect both sides on the topic
and understand that people have a harder time
forming an opinion with the recent media sensorship on the topic.

Due to the sensitivity of the topic,
we will decide whether or not to include the feature,
when a signed PDF can be download from the government.


