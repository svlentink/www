import { drawClock } from './canvasClock.js'
import { stringToChord, getNotes, chords } from './chords.js'
import { redrawNeck } from './guitarNeck.js'

$( document ).ready(function() {
  createDownloadBtn('saveChordBtn')
  showButtons()
  attachCallback()
});


function showButtons(currentChord='C'){
	drawClock(currentChord, 'clock');
	var chord = stringToChord(currentChord);			
	let btns = document.createElement('div');
	
	for(var i = 0;i < getNotes().length; i++){
		let note = getNotes()[i]
		let btn = document.createElement('button')
		btn.innerText = note
		btn.onclick = function(){showButtons(note)}
		btns.append(btn)
		if((i+1) % 6 ==0)
			btns.append(document.createElement('br'))
	}
	
  btns.append(document.createElement('br'))
	
	var i = 0;
	for(let key in chords){
		i++
		let note = chord['root'] + key
		let btn = document.createElement('button')
		btn.innerText = note
		btn.onclick = function(){showButtons(note)}
		btns.append(btn)
		if((i) % 4 ==0)
			btns.append(document.createElement('br'))
	}
	
	btns.append(document.createElement('br'))
	
	let btn = document.createElement('button')
	btn.onclick = function () { drawClock(currentChord) }
	var strS2 = "<button onclick='drawClock(&quot;"+ currentChord +"&quot;+this.textContent, &quot;clock&quot;);'>"
	
	for(var i = 0;i < getNotes().length; i++){
		let note = '/' + getNotes()[i]
		let btn = document.createElement('button')
		btn.innerText = note
		btn.onclick = function(){drawClock(currentChord + note)}
		btns.append(btn)
		if((i+1) % 6 ==0)
			btns.append(document.createElement('br'))
	}
	
	let container = document.querySelector('#known')
	container.innerHTML = ''
	container.append(btns)
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

function attachCallback(){
	for (let e of document.querySelectorAll('select')) {
		e.onchange = redrawNeck
	}
}
