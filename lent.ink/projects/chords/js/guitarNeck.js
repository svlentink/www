import { canvasCircle, canvasLine } from './canvas.js'
import { standardTuning, getNotes, notesToInts, intToNote } from './chords.js'

$( document ).ready(function() {
    fillTuners();
});

var fretHeight = 45;
var nutHeight = 250;
var stringSpaced = 35;

		
function redrawNeck(capo){
	var tuning = getCurrentTuning();

	drawNeck();
	var canvasId = "canvas";
	drawNotes(tuning, canvasId);
	
	drawCapo(capo, canvasId);
}
function getCurrentTuning(ids=['tune0','tune1','tune2','tune3','tune4','tune5']){
	let result = []
	for (let id of ids)
	  result.push( document.querySelector('#'+id).value )
	return result
}

function getFretCount(){
	return parseInt($('#fretCount').val());
}

function setNeck(notes, capo, tuning){
	tuning = tuning || getCurrentTuning();
	capo = capo || document.querySelector('#capo').value;
	
	//also possible to use notes instead of notenumbers
	if(typeof notes[0] != "number")
		notes = notesToInts(notes);
	
	drawNeck();
	drawNotes(tuning,'DimGray');
	
	tuning = notesToInts(tuning);

	var notesCount = getNotes().length;
	//+9 because its easiest way to fix ugly problem for drawcapo
	for(var x = 0;x < tuning.length;x++)
		for(var y = parseInt(capo); y < (getFretCount() +9 );y++){	//+9
			var currNote = (tuning[x] + y) % notesCount;
			if( $.inArray(currNote, notes) !== -1  )
				drawNote([x,y],intToNote(currNote));
		}
	
	drawCapo(capo);
}

function drawNeck(){
	var canvasId = "canvas";
	
	document.getElementById(canvasId).height = nutHeight -25 + fretHeight*getFretCount();

	drawStrings(canvasId);
	drawTuning();//just looks pretty
	drawFrets(canvasId);
	drawFretNumbers(canvasId);
	drawNeckDots(canvasId);//markings
}

function drawStrings(canvasId){
	canvasId = canvasId || "canvas";

	var height = document.querySelector('#'+canvasId).height
	var width = stringSpaced;
	var txtHeight = 25;
	for(var x = 15; x <= 15+5*width; x+=width)
		for(var y = nutHeight; y < height; y+=fretHeight)
			canvasLine([x,y],[x,y+fretHeight-txtHeight]);
}

function drawTuning(tunercount=6){
	let init_height = 30
	let interval_height = 70
	let half_tc = parseInt(tunercount/2)
	let nutHeight = init_height + half_tc * interval_height + 10
	var nut = nutHeight -25;//-25 to show note bubble above nut
	for (var i=0; i<half_tc;i++){
		let height = init_height + interval_height*i
		let left = 25
		let right = stringSpaced * tunercount - left -5
		canvasCircle([left-5,height],5)
		canvasLine([left,height],[15+stringSpaced*(half_tc-i-1),nut])
		canvasCircle([right+5,height],5)
		canvasLine([right,height],[15+stringSpaced*(i+3),nut])
	}
}

function drawFrets(canvasId){
	canvasId = canvasId || "canvas";

	var width = $('#'+canvasId).attr('width');
	for(var i = nutHeight; i < nutHeight+getFretCount()*fretHeight; i+=fretHeight)
		canvasLine([0,i],[width,i]);
}

function drawFretNumbers(canvasId){
	canvasId = canvasId || "canvas";

	for(var i = 0;i < getFretCount();i++){
		var c = document.getElementById(canvasId);
		var ctx = c.getContext("2d");
		ctx.font = "10px Arial";
		ctx.fillText(i,98,nutHeight-1+i*fretHeight);
	}				
}

function drawNeckDots(){//markings at fret 3,5,7,9,12 etc.
	var r = 5;
	var nut = nutHeight;
	canvasCircle([102,nut + 2.5*fretHeight],r,true);
	canvasCircle([102,nut + 4.5*fretHeight],r,true);
	canvasCircle([102,nut + 6.5*fretHeight],r,true);
	canvasCircle([102,nut + 8.5*fretHeight],r,true);

	canvasCircle([32,nut + 11.5*fretHeight],r,true);
	canvasCircle([172,nut + 11.5*fretHeight],r,true);
	
	canvasCircle([102,nut + 14.5*fretHeight],r,true);
	canvasCircle([102,nut + 16.5*fretHeight],r,true);
	canvasCircle([102,nut + 18.5*fretHeight],r,true);
}

function drawNotes(tuning, color){
	var notes = notesToInts(tuning);

	//+2 because its easiest way to fix ugly problem for drawcapo
	for(var x = 0;x < notes.length;x++)
		for(var y = 0; y < getFretCount()+2;y++)	//+2
			drawNote([x,y],intToNote(notes[x]+y), color);
}

function drawNote(loc,txt,color,canvasId,brandtxt="Guitar"){
	color = color || 'black';
	canvasId = canvasId || "canvas";

	var x = 7+loc[0]*stringSpaced;
	var y = nutHeight - 9 +loc[1]*fretHeight;
		
	canvasCircle([x+8,y-5],12,0,color);
	let brand = $('<textarea />').html(brandtxt).text();
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	ctx.font = "14px Arial";
	ctx.fillStyle = color;
	ctx.fillText(txt,x,y);
	ctx.fillText(brand,80,20);
}

function drawCapo(position, canvasId='canvas'){
	position = position || $('#capo').val();
	if(position <= 0)
		return;

	var width = $('#'+canvasId).attr('width');
	var y = position*fretHeight + nutHeight -30;
	canvasLine([0,y],[width,y],20);

	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	ctx.font = "20px Arial";
	ctx.fillStyle = 'white';
	ctx.fillText('CAPO',75,y+7);
	ctx.fillStyle = 'black';
}

function fillTuners(){
	for(var i = 0; i < standardTuning.length;i++){
		for(var n = 0;n < getNotes().length; n++){
			var note = document.createElement('option');
			note.val = getNotes()[n];
			note.textContent = getNotes()[n];
			if(getNotes()[n] == standardTuning[i])
				$(note).attr('selected','selected');
			$('#tune'+i).append(note);
		}
	}
}

export { setNeck, redrawNeck }
