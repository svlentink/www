$( document ).ready(function() {
    createDownloadBtn('saveChordBtn');
	showButtons();
});

function showButtons(currentChord){
	var currentChord = currentChord || 'C';//if argument not given
	drawClock(currentChord, 'clock');
	var chord = stringToChord(currentChord);			
	var chordString = '';
	
	var strS1 = "<button onclick='showButtons(this.textContent);'>";
	var strE = "</button>";
	
	for(var i = 0;i < getNotes().length; i++){
		chordString += strS1 + getNotes()[i] + strE;
		if((i+1) % 6 ==0)
			chordString += "<br/>";
	}
	
	chordString += "<br/>";
	
	var i = 0;
	for(key in chords){
		i++;
		chordString += strS1 + chord['root'] + key + strE;
		if((i) % 4 ==0)
			chordString += "<br/>";
	}
	
	chordString += "<br/><br/>";
	
	var strS2 = "<button onclick='drawClock(&quot;"+ currentChord +"&quot;+this.textContent, &quot;clock&quot;);'>";
	
	for(var i = 0;i < getNotes().length; i++){
		chordString += strS2 + '/' + getNotes()[i] + strE;
		if((i+1) % 6 ==0)
			chordString += "<br/>";
	}
	
	$('#known').html(chordString);
}

function createDownloadBtn(containerId){
	var link = document.createElement('a');
	link.innerHTML = 'Download Chord';
	link.addEventListener('click', function(ev) {
	    link.href = clock.toDataURL();
	    link.download = "chord.png";
	}, false);
	$('#'+containerId).append(link);
}