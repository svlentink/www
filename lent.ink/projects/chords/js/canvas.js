function canvasCircle(location,radius,fill,color,canvasId){
	canvasId = canvasId || 'canvas';
	color = color || 'black';
	
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(location[0],location[1],radius,0,2*Math.PI);
	if(fill)
		ctx.fill();
	//ctx.lineWidth = 1
	ctx.strokeStyle = color;
	ctx.stroke();
}

function canvasLine(from,to,width,color,canvasId){
	canvasId = canvasId || 'canvas';
	color = color || 'black';
	
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	ctx.moveTo(from[0],from[1]);
	ctx.lineTo(to[0],to[1]);
	ctx.lineWidth = width || 1;//if with param not given
	ctx.fillStyle = color;
	ctx.stroke();
}
