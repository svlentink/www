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

Deze service was gemaakt omdat wij de volgende authenticatie methodes niet geschikt vonden.

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


