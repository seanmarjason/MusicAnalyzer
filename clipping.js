function Clipping(){
	this.name = "Analyze Track Clipping";

	var bins = 64;
	var binWidth = width / bins;
	var binHeight = height - 200;

	var spectrumFourier = new p5.FFT(0.8, bins);

	var signalThreshold = 200;

	// initialize maxSignals array
	var maxSignals = [];
	for(i = 0; i < bins; i++) {
		maxSignals.push(0);
	}

	this.draw = function(){

		var spectrum = spectrumFourier.analyze(bins);

		for(var i = 0; i < bins; i++){

			// draw signal threshold
			push();
			stroke(100);
			strokeWeight(1);
			var signalThresholdLine = map(signalThreshold, 0, 255, height, height - binHeight);
			line(0, signalThresholdLine, width, signalThresholdLine);

			fill(100);
			noStroke();
			textAlign(RIGHT);
			textSize(14);
			text('Signal Threshold: ' + signalThreshold, width - 20, signalThresholdLine - 20);
			pop();

			// fade the colour of the bin from green to red
			push();
			noStroke();
			var g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			//draw each bin as a rectangle from the left of the screen across
			var x = map(i, 0, bins, 0, width);
			var h = -binHeight + map(spectrum[i], 0, 255, binHeight, 0);
			rect(x, height, binWidth - 2, h);
			pop()

			// update & draw max signals
			push();
			if (maxSignals[i] < spectrum[i]) {
				maxSignals[i] = spectrum[i];
			}
			stroke(255);
			strokeWeight(5);
			var l = map(maxSignals[i], 0, 255, height, height - binHeight);
			line(x + 1, l, x + binWidth - 1, l);
			pop();

			// show error information where max signal exceeds threshold
			push();
			fill(255, 0, 0);
			textSize(12);
			stroke(50);
			strokeWeight(2);
			if (maxSignals[i] > signalThreshold) {
				var issue = (map(i, 0, bins, 20, 20000)).toFixed(2);
				text('~' + issue + 'Hz', x, l - 25);
				line(x + (binWidth / 2), height, x + (binWidth / 2), l + 5);
			}
			pop();
		}
	};
}
