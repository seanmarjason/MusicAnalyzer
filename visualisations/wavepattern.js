//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.name = "Waveform Visualiser";

	var waveHeight = 250;
	var wavePosition = height / 4 * 3;
	var waveStart = 100;
	var waveEnd = width - 100;

	var retentionHistory = 100;
	var waveHistory = [];
	var waveHistoryOffsetX = 10;
	var waveHistoryOffsetY = 10;

	var wavepatternFourier = new p5.FFT(0.1, 32);
	wavepatternFourier.smooth(0.8);

	//draw the wave form to the screen
	this.draw = function() {

		//calculate the waveform from the fft.
		var wave = wavepatternFourier.waveform();

		// Add wave to history for 3D visualisation
		if (waveHistory.length > retentionHistory) {
			waveHistory.pop();
		}
		waveHistory.unshift(wave);

		// DRAW CURRENT WAVEFORM TO SCREEN
		push();
		noFill();
		stroke(0, 200, 255);
		strokeWeight(5);

		beginShape();
		for (var i = 0; i < wave.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, waveStart, waveEnd);
			var y = map(wave[i], -1, 1, wavePosition - waveHeight, wavePosition + waveHeight);
			vertex(x, y);
		}
		endShape();
		pop();

		// DRAW WAVE HISTORY FOR 3D EFFECT
		push();
		noFill();
		strokeWeight(1);
		for (var i = 1; i < waveHistory.length; i++) {
			stroke(255 - (map(i, 1, waveHistory.length, 0, 255)));
			beginShape();
			for (var j = 0; j < waveHistory[i].length; j++) {
				var x = map(j, 0, waveHistory[i].length, waveStart + (i * waveHistoryOffsetX), waveEnd + (i * waveHistoryOffsetX));
				var y = map(waveHistory[i][j], -1, 1, wavePosition - waveHeight - (i * waveHistoryOffsetY), wavePosition + waveHeight - (i * waveHistoryOffsetY))
				vertex(x, y);
			}
			endShape();
		}

		pop();
	};

	this.reset = function() {
		waveHistory = [];
	}
}