//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.name = "Waveform Visualiser";

	var wavepatternFourier = new p5.FFT(0.1, 32);
	wavepatternFourier.smooth(0.8);

	var wave = {}; // private object to hold wave position parameters
	var waveHistory = []; // private array to hold historic waves for 3D effect

	// set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
	this.resize = function() {
		wave.position = height / 4 * 3;
		wave.height = height / 5;
		wave.start = 100;
		wave.end = width - 100;
	}
	this.resize();

	// settings for 3D effect
	this.retentionHistory = 100;
	this.offset = {
		x: 10,
		y: 10
	}

	this.setOffset = function(direction, value) {
		this.offset[direction] = value;
	}

	//draw the wave form to the screen
	this.draw = function() {

		//calculate the waveform from the fft.
		var wavepattern = wavepatternFourier.waveform();

		// Add wave to history for 3D visualisation
		if (waveHistory.length > this.retentionHistory) {
			waveHistory.pop();
		}
		waveHistory.unshift(wavepattern);

		// DRAW CURRENT WAVEFORM TO SCREEN
		push();
		noFill();
		stroke(0, 200, 255);
		strokeWeight(5);

		beginShape();
		vertex(wave.start - 10, wave.position);
		for (var i = 0; i < wavepattern.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wavepattern.length, wave.start, wave.end);
			var y = map(wavepattern[i], -1, 1, wave.position - wave.height, wave.position + wave.height);
			vertex(x, y);
		}
		vertex(wave.end + 10, wave.position);
		endShape();
		pop();

		// DRAW WAVE HISTORY FOR 3D EFFECT
		push();
		noFill();
		strokeWeight(1);
		// for each historic wavepattern
		for (var i = 1; i < waveHistory.length; i++) {
			stroke(255 - (map(i, 1, waveHistory.length, 0, 255)));
			beginShape();
			vertex((wave.start - 10) + (i * this.offset.x), wave.position - (i * this.offset.y));
			// for each value in the wavepattern
			for (var j = 0; j < waveHistory[i].length; j++) {
				var x = map(j, 0, waveHistory[i].length, wave.start + (i * this.offset.x), wave.end + (i * this.offset.x));
				var y = map(waveHistory[i][j], -1, 1, wave.position - wave.height - (i * this.offset.y), wave.position + wave.height - (i * this.offset.y))
				vertex(x, y);
			}
			vertex((wave.end + 10) + (i * this.offset.x), wave.position - (i * this.offset.y));
			endShape();
		}

		pop();
	};

	this.reset = function() {
		waveHistory = [];
	}
}