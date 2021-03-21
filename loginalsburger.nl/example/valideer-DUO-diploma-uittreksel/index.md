
# Valideer DUO diploma uittreksel PDF certificaat online

Op deze pagina kunt u het certificaat van een
digitaal gewaarmerkte PDF vanuit het
diplomaregister van DUO valideren.
De overheid schrijft hiervoor
[Acrobat Reader](https://www.kvk.nl/producten-bestellen/bedrijfsproducten-bestellen/uittreksel-handelsregister/digitaal-gewaarmerkte-documenten/)
voor,
maar de versie die dit kan is alleen toegangelijk op Windows of MacOS.
Voor Android, Linux, Chromebooks, iOS etc. kunt u gebruikmaken van deze onlineversie.

Wij merken op dat de certificaten op diplomas verlopen,
dus dat een niet recent gedownloade PDF onterecht als niet valide aangemerkt kan worden,
terwijl die dat in eerste instantie wel was.

Voorbeelden van diplomas;
[havo](https://www.frankvanmourik.com/documents/Hoger%20algemeen%20voortgezet%20onderwijs.pdf),
[MBO](https://www.antwanvantilborgh.nl/wp-content/uploads/2019/03/Mbo-Commercieel-medewerker-Junior-Accountmanager.pdf),
[HBO](https://maartenpaauw.com/static/education/hogeschool-leiden-informatica-bachelor.pdf),
[WO](https://axelkoolhaas.com/doc/Axel_Koolhaas-Master_Security_and_Network_Engineering.pdf).
<!--
[vwo](https://www.coursehero.com/file/52971816/Voorbereidend-wetenschappelijk-onderwijspdf/)
[HBO](https://axelkoolhaas.com/doc/Axel_Koolhaas-Bachelor_Informatica.pdf)
-->


<form id='pdfform' action="/pdf/" enctype="multipart/form-data" method="post" onsubmit="return false">
	<input type="file" name="pdf" />
	<br/>
	<input type="submit" class='nl' value="Valideer >" />
</form>
<pre style='width:100%;height:50%;'></pre>
<script type="module"> 
	import { submitForm } from '/main.js'
	function pdfCallback(res){
		let text
		if (typeof res === 'object'){
			text = JSON.stringify(res,null,2)
			if ('parsed' in res && 'token' in res.parsed)
				alert(':) Gewaarmerkte pdf van de overheid.')
		}
		else text = res
		document.querySelector('pre').innerText = text
	}
	document.querySelector('form').onsubmit = function(e){ e.preventDefault(); submitForm(this, pdfCallback);return false }
</script>


