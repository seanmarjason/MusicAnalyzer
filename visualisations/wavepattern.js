// Constructor to display visualisation to trial new additions to a track with sound synthesis
// @param name: Title to be used for menu
// @param retentionHistory: number of historic waveforms to keep in visualisation
// @param offset: amount of pixels to offset historic waveforms on x and y axis
// @method resize: set size values in resize function to enable responsiveness
// @method draw: draw visualisation to canvas
// @method setOffset: amend offset value for x or y coordinate
// @method reset: clear current analysis
function WavePattern() {
	//vis name
	this.name = "Waveform Visualiser";

	const wavepatternFourier = new p5.FFT(0.1, 32);
	wavepatternFourier.smooth(0.8);

	let wave = {}; // private object to hold wave position parameters
	let waveHistory = []; // private array to hold historic waves for 3D effect

	// settings for 3D effect
	this.retentionHistory = 100;
	this.offset = {
		x: 10,
		y: 10
	}

	// set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
	this.resize = function() {
		wave.position = height / 4 * 3;
		wave.height = height / 5;
		wave.start = 100;
		wave.end = width - 100;
	}
	this.resize();

	//draw the wave form to the screen
	this.draw = function() {

		//calculate the waveform from the fft.
		const wavepattern = wavepatternFourier.waveform();

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
		for (let i = 0; i < wavepattern.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			const x = map(i, 0, wavepattern.length, wave.start, wave.end);
			const y = map(wavepattern[i], -1, 1, wave.position - wave.height, wave.position + wave.height);
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
		for (let i = 1; i < waveHistory.length; i++) {
			stroke(255 - (map(i, 1, waveHistory.length, 0, 255)));
			beginShape();
			vertex((wave.start - 10) + (i * this.offset.x), wave.position - (i * this.offset.y));
			// for each value in the wavepattern
			for (let j = 0; j < waveHistory[i].length; j++) {
				const x = map(j, 0, waveHistory[i].length, wave.start + (i * this.offset.x), wave.end + (i * this.offset.x));
				const y = map(waveHistory[i][j], -1, 1, wave.position - wave.height - (i * this.offset.y), wave.position + wave.height - (i * this.offset.y))
				vertex(x, y);
			}
			vertex((wave.end + 10) + (i * this.offset.x), wave.position - (i * this.offset.y));
			endShape();
		}

		pop();
	};

	this.setOffset = function(direction, value) {
		this.offset[direction] = value;
	}

	// function to reset the visualisation
	this.reset = function() {
		waveHistory = [];
	}
}