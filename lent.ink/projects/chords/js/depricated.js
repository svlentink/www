function createHead(){//crazy.. i just inserted the html
	var container = document.createElement('div');
	var tuner = document.createElement('div');
	$(tuner).addClass('tuner');
	//vertical containers
	var verCon01 = document.createElement('div');
	$(verCon01).addClass('tunerColumn');
	var verCon02 = document.createElement('div');
	$(verCon02).addClass('spacerColumn');
	var verCon03 = document.createElement('div');
	$(verCon03).addClass('headWood');
	var tunerSpacer = document.createElement('div');
	$(tunerSpacer).addClass('tunerSpacer');
	
	var leftTuners = $(verCon01).clone(true).append($(tuner).clone(true).attr('id','tuner3'))
											.append($(tuner).clone(true).attr('id','tuner2'))
											.append($(tuner).clone(true).attr('id','tuner1'));
	var rightTuners= $(verCon01).clone(true).append($(tuner).clone(true).attr('id','tuner4'))
											.append($(tuner).clone(true).attr('id','tuner5'))
											.append($(tuner).clone(true).attr('id','tuner6'));
	$(verCon02).append($(tunerSpacer).clone(true))
				.append($(tunerSpacer).clone(true))
				.append($(tunerSpacer).clone(true));
	
	$(container).append(leftTuners)
				.append($(verCon02).clone(true))
				.append(verCon03)
				.append($(verCon02).clone(true))
				.append(rightTuners);
	
	$('body').append(container);
}

var chordsOld = {	//http://guitarchordsworld.com/chord-theory
						'':		[1,5,8],		//Major
						'm':	[1,4,8],		//Minor
						'7':	[1,5,8,11],		//7th
						'm7': 	[1,4,8,11],		//Minor 7th
						'maj7': [1,5,8,12],		//Major 7th
						'm7b5': [1,4,7,11], 	//Minor 7th Flat 5th
						'sus2': [1,3,8],		//not on mentioned site
						'sus4': [1,6,8],		//Suspended 4th
						'dim':	[1,4,7],		//Diminished
						'dim7': [1,4,7,10],
						'aug':	[1,5,9],		//Augmented
						'6':	[1,5,8,10],		//6th
						'm6': 	[1,4,8,10],		//Minor 6th
						'6add9':[1,5,8,10,3],	//6th Add 9th
						'9': 	[1,5,8,11,3], 	//9th
						'maj9': [1,5,11,2],
						'm9': 	[1,4,8,11,3],	//Minor 9th
						'maj9': [1,5,8,12,3]	//Suspended 4th
};