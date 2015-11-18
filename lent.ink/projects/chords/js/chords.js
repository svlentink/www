var useFlat = false;
var notesFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
var notesSharp= ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var notesCount= useFlat?notesFlat.length:notesSharp.length;
var standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

var chords = {	//http://guitarchordsworld.com/chord-theory
						'':		[0,4,7],		//Major
						'm':	[0,3,7],		//Minor
						'7':	[0,4,7,10],		//7th
						'm7': 	[0,3,7,10],		//Minor 7th
						'maj7': [0,4,7,11],		//Major 7th
						'm7b5': [0,3,6,10], 	//Minor 7th Flat 5th
						'sus2': [0,2,7],		//not on mentioned site
						'sus4': [0,5,7],		//Suspended 4th
						'dim':	[0,3,6],		//Diminished
						'dim7': [0,3,6,9],
						'aug':	[0,4,8],		//Augmented
						'6':	[0,4,7,9],		//6th
						'm6': 	[0,3,7,9],		//Minor 6th
						'6add9':[0,4,7,9,2],	//6th Add 9th
						'9': 	[0,4,7,10,2], 	//9th
						'maj9': [0,4,10,1],
						'm9': 	[0,3,7,10,2],	//Minor 9th
						'maj9': [0,4,7,11,2]	//Suspended 4th
};

function noteToInt(note){
	for(var i = 0; i <= notesCount; i++)
		if(note == notesFlat[i] || note == notesSharp[i])
			return i;
	
	return 0;
}
function notesToInts(notes){
	var rtrn = [];
	for(var i = 0; i < notes.length; i++)
		rtrn.push(noteToInt(notes[i]));
		
	return rtrn;
}

function intToNote(inp){
	inp = inp.mod(notesCount);
	
	if(useFlat)
		return notesFlat[inp];
	else
		return notesSharp[inp];
}
function intsToNotes(ints){
	var rtrn = [];
	for(var i = 0; i < ints.length; i++)
		rtrn.push(intToNote(ints[i]));
		
	return rtrn;
}

//http://blog.chinmoymohanty.com/javascript-does-not-support-method-overloadingthats-true/
function getNotes(chord) {
	if (arguments.length==1){
		var chord = arguments[0];//function input argument
		chord = stringToChord(chord);
		
		var notes = noteToChordNotes(chord['root'], chord['type']);
		if(!chord['bass'].empty())
			notes = [chord['bass']].concat(notes);
		
		notes = notes.removeDuplicates();

		return notes;
	}
	else{//return all notes
		var rtrn = [];
	
		for(var i = 0; i < notesCount; i++)
			rtrn.push(intToNote(i));
		
		return rtrn;
	}
}

function stringToChord(string){
	var inp = $.trim(string);//remove spaces
	var chord = inp.until('/');
	var bassNote = inp.from('/');//split chord
	
	var rootNote = chord[0];
	var chordType = '';
	
	if(chord.length > 1 && (chord[1] == '#' || chord[1] == 'b') ){
		rootNote += chord[1];
		chordType = chord.substring(2);
	}
	else
		chordType = chord.substring(1);
		
	return {'bass' : bassNote, 'root' : rootNote, 'type' : chordType};
}

function stringToChords(string){
	var arr = string.split(',');
	var rtrn = {};
//console.log(arr);
	for(var i = 0; i < arr.length;i++){
		arr[i] = $.trim(arr[i]);//remove spaces
		rtrn[arr[i]] = stringToChord(arr[i]);
	}
//console.log(rtrn);
	return rtrn;
}
function transposeChords(string, trans){
	var chords = stringToChords(string);
	trans = parseInt(trans);
//console.log('transposeChords(), trans:'+trans);
//console.log('in:' + string);
//console.log(chords);
	var rtrn = document.createElement('span');
	
	for(key in chords){
		var chord = chords[key];
//console.log('printing chord');
//console.log(chord);
		var root = noteToInt(chord['root']) + trans;
		var type = chord['type'];
		var bass = chord['bass'];
		var curr = intToNote(root) + type;
//console.log('root:' + root + ', type:' +type + ', curr:' + curr);
		if(!bass.empty()){
			bass = noteToInt(chord['bass']) + trans;
			curr += '/' + intToNote(bass);
		}
		var origBtn = document.createElement('button');
		var transBtn = document.createElement('button');
		var origOnclick = 'drawClock("' + key + '","clock");';
		var transOnclick = 'drawClock("' + curr + '","clock");';
		
		$(origBtn).attr('onclick', origOnclick)
			.text(key);
		$(transBtn).attr('onclick', transOnclick)
			.text(curr);
			
		var span = document.createElement('span');
		$(span).append(origBtn);
		if(trans != 0)
			$(span).append(' = ')
				.append(transBtn)
				.append(', ');
		
		$(rtrn).append(span);
	}
	
	return rtrn;
}
		
function noteToChordNotes(rootNote, chordType){
//console.log("noteToChordNotes called with:" + rootNote + " : " + chordType);
	var noteInt = noteToInt(rootNote);
	var notes = chords[chordType];
	var rtrn = [notes.length];
	
	for(var i = 0; i < notes.length; i++)
		rtrn[i] = intToNote(notes[i] + noteInt);
		
	return rtrn;
}