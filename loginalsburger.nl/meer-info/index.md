<title>Meer informatie</title>

Deze pagina is in het Nederlands
en onze technische documentatie en
[voorwaarden](/terms)
zijn in het Engels.
Deze service is geschreven voor en door developers,
om de implementatie van persoonsgegevens vanuit de overheid
makkelijk te kunnen integreren in services.

## Hoe werkt het?

Een succesvolle gebruikerservaring ziet er als volgt uit:

- Een webservice geeft aan welke gegevens die van de burger wil ontvangen.
- Deze webservice verwijst u door naar LoginAlsBurger.
- De LoginAlsBurger website vraagt u:
    - PDF(s) te downloaden bij de overheid, die alleen toegangelijk is via Digid.
    - Deze PDF(s) te uploaden.
- De LoginAlsBurger server doet het volgende:
    - controleert de echtheid van de PDF
    - haalt de persoonsgegevens uit de PDF
    - delete de PDF van de server
    - de persoonsgegevens worden [gewaarmerkt](https://en.wikipedia.org/wiki/JSON_Web_Token) op een [vergelijkbare manier](https://en.wikipedia.org/wiki/Public-key_cryptography) als het groene slotje in uw browser
    - de gewaarmerkte gegevens worden teruggegeven aan de browser van de burger die inlogt, waarna de server [alles direct vergeet](https://en.wikipedia.org/wiki/Stateless_protocol)
- De inloggende burger krijgt nu een overzicht van de gegevens en heeft de keuze deze wel of niet door te sturen.
- Wanneer de burger de gegevens doorstuurt, worden deze ontvangen door de webservice die hierom vroeg.


## Technische documentatie

- [Example use cases](/example/use-cases)
- [Frontend example](/example/frontend)
- [Backend example](/example/backend)

Dear (business) developers, please
[reach out](https://www.linkedin.com/in/svlentink)
to us if you want to use this service,
we would love to help and learn from your feedback on this service.

## Kosten

Deze service wordt kostenloos aangeboden,
gezien het implementeren van een pricing model
meer geld/tijd/energie zou kosten dan het oplevert.
Wij zijn goed betaalde professionals in het dagelijks leven die ons
liever focussen op de tech dan business/marketing/sales etc.

Daarnaast hopen wij dat de overheid in de (nabije) toekomst toegankelijke
APIs beschikbaar stelt en dat deze service overbodig wordt.

## Waarom LoginAlsBurger.nl

Als bedrijf zonder vaste locatie heb je de
[mogelijkheid](https://e-resident.me/estonia-company-formation-e-residency-the-full-guide-2020/)
om een
[alternatief](https://e-resident.gov.ee/start-a-company/)
te kiezen voor de Nederlandse belastingdienst,
wanneer je hun services niet fijn vindt.
Burgers die inloggen op uw service zijn afhankelijk van de authenticatie methode die u kiest.
Hierin heeft u een aantal keuzes,
waarbij LoginAlsBurger meer dan
[11 miljoen](https://opendata.cbs.nl/statline/portal.html?_la=nl&_catalog=CBS&tableId=83488NED&_theme=416)
burgers kosteloos laat inloggen bij uw service.

<!--
I quote:
Mijn Belastingdienst is tijdelijk niet bereikbaar. Dit komt doordat het maximale aantal mensen is ingelogd. Wij vragen u om later terug te komen. Onze excuses voor het ongemak.
-->

Hieronder nog een overzicht van de alternatieven die er zijn naast deze service.

#### eID van eIDAS

Hierover valt te lezen;
"[you need to contact your Member State representative](https://ec.europa.eu/cefdigital/wiki/display/cefdigital/eid)".
Wat maakt dat het niet toegangelijk is voor een developer.

#### iDIN

iDIN is net als eID niet een vrij toegangelijke API.
Daarnaast maakt deze service gebruik van de gegevens
die bekend zijn bij de bank.
Na eigen onderzoek bij onszelf kwamen wij erachter dat
de helft van onze bankrekeningen
[verouderde NAW gegevens](https://www.idin.nl/over-idin/datakwaliteit/)
hadden omdat deze banken alles digitaal deden.
De NAW gegevens van een burger zijn waarschijnlijk meer up-to-date
bij de overheid dan bij een bank.

Daarnaast kregen wij als feedback van een millennial
dat er meer en meer nederlands zijn die gaan voor
[gratis buitenlandse bankrekenginen](https://gathering.tweakers.net/forum/list_messages/1984756)
met maestro, creditcard en
[iDEAL](https://blog.revolut.com/ideal-live-in-the-netherlands/).
Voor klanten van deze banken is iDIN geen mogelijkheid.

## Veiligheid

Wanneer we onze service vergelijken met een Facebook login,
zien we dat je bij beide services geredirect wordt naar een login pagina van de service.
Echter, zou een malicious service dat niet doen,
maar zelf een scherm tonen om het Facebook wachtwoord in te vullen,
waarna die service nu namens die gebruiker overal kan inloggen.
Ditzelfde geld voor deze service.
Een malicious service zou een PDF upload formulier kunnen presenteren
en deze vervolgens doorspelen naar de backend van LoginAlsBurger,
om een login token te verkrijgen voor een andere service.

Net zoals andere login services (bv. Facebook),
gaan wij er vanuit dat de gebruiker alleen zijn of haar gegevens
verstrekt aan een betrouwbare partij.

Technisch gezien zou dit verholpen kunnen worden
wanneer de gebruiker een vrij veld zou kunnen invullen in een gewaarmerkte PDF
van de overheid, maar dit is nog nergens mogelijk.
Voor nu dient iedere service die gebruikt maakt van LoginAlsBurger daarom
de PDF met de nieuwste timestamp (laatst gedownload RDW PDF)
te zien als de geauthenticeerde burger,
zoals aangegeven in de technische documentatie.

