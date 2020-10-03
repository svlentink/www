//contribution to heros:
//http://www.diva-portal.org/smash/get/diva2:668903/FULLTEXT01.pdf
//http://people.csail.mit.edu/costis/chord.pdf
//http://www.danmansmusic.com/chords3/guitar.html
//http://inperc.com/wiki/index.php?title=Guitar_Chord_Calculator
//http://stackoverflow.com/questions/4033083/guitar-chord-recognition-algorithm
//http://www.mathworks.nl/help/signal/examples/generating-guitar-chords-using-the-karplus-strong-algorithm.html



var fingerFlexAtFret = [4,10];
//if your fingers stretch 4frets at the top,
//they will stretch 5frets at fret 4, and 6frets at fret 10



function tuningToMatrix(tuning,fretCount){
	var notes = notesToInts(tuning);
	var rtrn = [tuning.length];//[fretCount][tuning.length];
	
	for(var x = 0;x < notes.length;x++){
		var gstring = [fretCount];
		
		for(var y = 0; y < fretCount;y++)
			gstring[y] = (notes[x]+y) % 12;
	
		rtrn[x] = gstring;
	}
	return rtrn;
}


function findChord(tuning, chord, bassNote, fingerFlex){
	/*
	 * This function only handles simple to grab chords.
	 * This means:
	 * -all strings to pluck are located from the high E
	 * -no non strumable strings along the way up (e.g no [023X32])
	 * -barre only from bottom up
	 */

//Any chord with the notes C, E, and G is a C Major chord no matter which note is in the bass, because they all contain the same notes.
//http://musictheoryblog.blogspot.nl/2007/02/chord-roots-and-chord-inversion.html

}

function getInvertedChord(tuning, chord, fretCount=13, fingerFlex=4){
	//inverted means that i pay no attention to the root note,
	//every note in the chord can be the first
	
	//also possible to use notes instead of notenumbers
	if(typeof tuning[0] != "number")
		tuning = notesToInts(tuning);
		
	chord = stringToChords(chord)[chord];
	var notes = chord['notes'];
	if(!chord['bass'].empty())
		chord['notes'].push(notes['bass']);
	
	notes = notesToInts(notes);
	notes.removeDuplicates();//if bass note was in chord
	
	var fretboard = tuningToMatrix(tuning,fretCount);
	console.log(fretboard);
	
	var grab = [tuning.length];
	for(var fret = 0; fret < fretCount; fret++)
		for(var str = 0; str < tuning.length; str++)
console.log(fretboard[str][fret]);
//			if(grab[str] != undefined)//not yet selected
//				if($.inArray(fretboard[str][fret], notes) !== -1)
//					grab[str] = fret;
			
		
	
	
	return grab;
}

