$( document ).ready(function() {
    fillTuners();
//	redrawNeck();
});

var fretHeight = 45;
var nutHeight = 250;

		
function redrawNeck(capo){
	var tuning = getCurrentTuning();

	drawNeck();
	var canvasId = "canvas";
	drawNotes(tuning, canvasId);
	
	drawCapo(capo, canvasId);
}
function getCurrentTuning(){
	var a = $('#tune0').val();
	var b = $('#tune1').val();
	var c = $('#tune2').val();
	var d = $('#tune3').val();
	var e = $('#tune4').val();
	var f = $('#tune5').val();
	return [a,b,c,d,e,f];
}

function getFretCount(){
	return parseInt($('#fretCount').val());
}

function setNeck(notes, capo, tuning){
	tuning = tuning || getCurrentTuning();
	capo = capo || $('#capo').val();
	
	//also possible to use notes instead of notenumbers
	if(typeof notes[0] != "number")
		notes = notesToInts(notes);
	
//	$('#tune0').val(tuning[0]);
//	$('#tune1').val(tuning[1]);
//	$('#tune2').val(tuning[2]);
//	$('#tune3').val(tuning[3]);
//	$('#tune4').val(tuning[4]);
//	$('#tune5').val(tuning[5]);
	
	drawNeck();
	drawNotes(tuning,'DimGray');
	
	tuning = notesToInts(tuning);
//console.log('tuning in setNeck:' +tuning + "; notes are:" + notes+"("+intsToNotes(notes)+"); capo value:"+capo);

	var notesCount = getNotes().length;
	//+9 because its easiest way to fix ugly problem for drawcapo
	for(var x = 0;x < tuning.length;x++)
		for(var y = parseInt(capo); y < (getFretCount() +9 );y++){	//+9
			var currNote = (tuning[x] + y) % notesCount;
//console.log("setNeck() currNote: "+intToNote(currNote)+" ("+currNote+"); at loc:["+x +","+y +"]; tuning[x]:"+tuning[x]);
			if( $.inArray(currNote, notes) !== -1  )
//console.log("note: "+intToNote(currNote)+"("+currNote+"); at loc:"+x +","+y);
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

	var height = $('#'+canvasId).attr('height');
	var width = 35;
	var txtHeight = 25;
	for(var x = 15; x <= 15+5*width; x+=width)
		for(var y = nutHeight; y < height; y+=fretHeight)
			canvasLine([x,y],[x,y+fretHeight-txtHeight]);
}

function drawTuning(){
	var nut = nutHeight -25;//-25 to show note bubble above nut
	canvasCircle([15,30],5);
	canvasLine([20,30],[15+35*2,nut]);
	canvasCircle([15,100],5);
	canvasLine([20,100],[15+35,nut]);
	canvasCircle([15,170],5);
	canvasLine([20,170],[15,nut]);
	canvasCircle([190,30],5);
	canvasLine([185,30],[15+35*3,nut]);
	canvasCircle([190,100],5);
	canvasLine([185,100],[15+35*4,nut]);
	canvasCircle([190,170],5);
	canvasLine([185,170],[15+35*5,nut]);
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

function drawNote(loc,txt,color,canvasId){
	color = color || 'black';
	canvasId = canvasId || "canvas";

	var x = 7+loc[0]*35;
	var y = nutHeight - 9 +loc[1]*fretHeight;
		
	canvasCircle([x+8,y-5],12,0,color);
	var font = "&#83;&#86;&#32;&#76;&#101;&#110;&#116;&#105;&#110;&#107;";
	font = $('<textarea />').html(font).text();
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	ctx.font = "14px Arial";
	ctx.fillStyle = color;
	ctx.fillText(txt,x,y);
	ctx.fillText(font,70,20);
	//ctx.endPath();
}

function drawCapo(position, canvasId){
	position = position || $('#capo').val();
	if(position <= 0)
		return;

	canvasId = canvasId || "canvas";

	var width = $('#'+canvasId).attr('width');
	var y = position*fretHeight + nutHeight -30;
	canvasLine([0,y],[width,y],20);

	canvasId = canvasId || "canvas";

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
