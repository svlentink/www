function drawClock(chord,canvasId){
	var notes = getNotes(chord);
console.log('drawClock(chord,canvasId) called with notes =' + notes);
	
	var c = document.getElementById(canvasId);
	var size = $(c).attr('height');
	$(c).attr('width',size);//set width the same as height, also resets canvas to blank
	
	var markings = getNotes();
	var offset = -90;
	drawMarkings(markings, offset, canvasId);
	drawCircleLines(notes, markings.length, offset, canvasId);
	
	//chord label
	var ctx = c.getContext("2d");	
	ctx.font = "25px Arial";
	ctx.fillText(chord,1,20);

	
	//also set the neck
	setNeck(notes);
}

function drawCircleLines(points, markingsCount, angleOffset, canvasId, circleOffset){
	//use -1 in points array to get the centre as a point
	
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	var size = $(c).attr('height');
	var r = size/2;//radius
	circleOffset = circleOffset||5;
	
	for(var i = 0; i < points.length-1;i++){
		var fromNoteInt = noteToInt(points[i]);
		var toNoteInt = noteToInt(points[i+1]);
		var angle = 360/markingsCount;
		var anglecorrection = Math.PI + 2*Math.PI*angleOffset/360;
		var degFrom = 2*Math.PI/markingsCount * fromNoteInt + anglecorrection;
		var degTo = 2*Math.PI/markingsCount * toNoteInt + anglecorrection;
		
		var xFrom = r + Math.sin(-1*degFrom)*(r-angle-circleOffset);
		var yFrom = r + Math.cos(degFrom)*(r-angle-circleOffset);
		if(fromNoteInt == -1){//use center
			xFrom = r;
			yFrom = r;
		}
		var xTo = r + Math.sin(-1*degTo)*(r-angle-circleOffset);
		var yTo = r + Math.cos(degTo)*(r-angle-circleOffset);
		if(toNoteInt == -1){// use center
			xTo = r;
			yTo = r;
		}
//console.log('With coordinates [' + xFrom + ',' + yFrom + '] [' + xTo + ',' + yTo + ']');
		ctx.moveTo(xFrom,yFrom);
		ctx.lineTo(xTo,yTo);
		ctx.stroke();
	}
}

function drawMarkings(markings, angleOffset, canvasId){
	var c = document.getElementById(canvasId);
	var size = $(c).attr('height');
	var r = size/2;//radius
	
	var ctx = c.getContext("2d");
	ctx.font = "20px Arial";
	
	ctx.beginPath();
	//outercircle
	ctx.arc(r,r,r-1,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	//innercircle
	ctx.arc(r,r,r-30,0,2*Math.PI);
	ctx.stroke();
	
	for(var i = 0; i < markings.length;i++){
		var deg = Math.PI + (2*Math.PI/markings.length)*i + (2*Math.PI * angleOffset/360);
		var angle = 360/markings.length/2;
		var x = r + Math.sin(-1*deg)*(r-angle);
		var y = r + Math.cos(deg)*(r-angle);
//console.log("i:" +i +"; deg:"+deg+"; x:"+x+"; y:"+y);
		ctx.fillText(markings[i],x-12,y+8);
	}
	
	var font = "&#83;&#86;&#32;&#76;&#101;&#110;&#116;&#105;&#110;&#107;";
	font = $('<textarea />').html(font).text();
	ctx.font = "10px Arial";
	ctx.fillText(font,size-50,size);
}
