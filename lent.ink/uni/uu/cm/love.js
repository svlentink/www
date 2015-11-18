


//https://stellafane.org/misc/equinox.html
function calcInitial( k, year ) { // Valid for years 1000 to 3000
	var JDE0=0, Y=(year-2000)/1000;
	switch( k ) {
	  case 0: JDE0 = 2451623.80984 + 365242.37404*Y + 0.05169*POW2(Y) - 0.00411*POW3(Y) - 0.00057*POW4(Y); break;
	  case 1: JDE0 = 2451716.56767 + 365241.62603*Y + 0.00325*POW2(Y) + 0.00888*POW3(Y) - 0.00030*POW4(Y); break;
	  case 2: JDE0 = 2451810.21715 + 365242.01767*Y - 0.11575*POW2(Y) + 0.00337*POW3(Y) + 0.00078*POW4(Y); break;
	  case 3: JDE0 = 2451900.05952 + 365242.74049*Y - 0.06223*POW2(Y) - 0.00823*POW3(Y) + 0.00032*POW4(Y); break;
	}
	return JDE0;
}
function calcEquiSol( i, year ) {
	var k = i - 1;
	var str;
	var JDE0 = calcInitial( k, year);	// Initial estimate of date of event
	var T = ( JDE0 - 2451545.0) / 36525;
	var W = 35999.373*T - 2.47;
	var dL = 1 + 0.0334*COS(W) + 0.0007*COS(2*W);
	var S = periodic24( T );
	var JDE = JDE0 + ( (0.00001*S) / dL ); 	// This is the answer in Julian Emphemeris Days
	var TDT = fromJDtoUTC( JDE );				// Convert Julian Days to TDT in a Date Object
	var UTC = fromTDTtoUTC( TDT );				// Correct TDT to UTC, both as Date Objects
	switch ( getTZ() ) { 
    		case "LCL": str = UTC.toString()    + "\n"; break;	//Convert to Local time string
    		case "UTC": str = UTC.toUTCString() + "\n"; break;	//Convert to UTC time string
    		case "DYN": str = TDT.toUTCString() + "\n";			//Convert to Dynamical Time String
    				str = str.replace( /UTC/g, "TDT" ); break;	// Change UTC to TDT in this output string
    }
	writeN( i, str );	// Output date & time of event in Local Time
}

function calc() {
	if ( firstTime ) { setCurrentYear(); firstTime = false; }
	clearAll();
	if (!valiDate()) { return; }
	var year = getYear();
	//Main Calculations started here
	for( var i=1; i<=4; i++ ) { // Loop over 4 events: 1=AE, 2=SS, 3-VE, 4=WS
		calcEquiSol( i, year ); // This routine calculates and displays a single event
	}
}
