function Clipping(){

	var self = this;

	this.name = "Analyze Track Clipping";

	this.bins = 64;
	this.signalThreshold = 240;
	
	var binWidth;
	var binHeight;

	// set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
	this.resize = function() {
		binWidth = width / this.bins;
		binHeight = height / 4 * 3;
	}
	this.resize();

	var clippingFourier = new p5.FFT(0.8, this.bins);

	// initialize maxSignals array
	var maxSignals = [];
	for(i = 0; i < this.bins; i++) {
		maxSignals.push(0);
	}

	this.setSignalThreshold = function(value) {
		self.signalThreshold = value;
		self.reset();
	}

	this.draw = function(){

		var spectrum = clippingFourier.analyze(this.bins);

		for(var i = 0; i < this.bins; i++){

			// draw signal threshold
			push();
			stroke(100);
			strokeWeight(1);
			var signalThresholdLine = map(this.signalThreshold, 0, 255, height, height - binHeight);
			line(0, signalThresholdLine, width, signalThresholdLine);

			fill(100);
			noStroke();
			textAlign(RIGHT);
			textSize(14);
			text('Signal Threshold: ' + this.signalThreshold, width - 50, signalThresholdLine - 20);
			pop();

			// fade the colour of the bin
			push();
			noStroke();
			var b = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], 150, b);

			// draw each bin as a rectangle from the left of the screen across
			var x = map(i, 0, this.bins, 0, width);
			var h = -binHeight + map(spectrum[i], 0, 255, binHeight, 0);
			rect(x, height, binWidth - 2, h);
			pop()

			// update max signals
			push();
			if (maxSignals[i] < spectrum[i]) {
				maxSignals[i] = spectrum[i];
			}

			// draw max signals
			stroke(255);
			strokeWeight(5);
			var l = map(maxSignals[i], 0, 255, height, height - binHeight);
			line(x + 1, l, x + binWidth - 1, l);
			pop();

			// show error information where max signal exceeds threshold
			push();
			fill(255, 150, 0);
			textSize(12);
			stroke(50);
			strokeWeight(2);
			if (maxSignals[i] > this.signalThreshold) {
				var issue = (map(i, 0, this.bins, 20, 20000)).toFixed(2);
				text('~' + issue + 'Hz', x, l - 25);
				line(x + (binWidth / 2), height, x + (binWidth / 2), l + 5);
			}
			pop();
		}
	};

	this.reset = function() {
		maxSignals = [];
		for(i = 0; i < this.bins; i++) {
			maxSignals.push(0);
		}
	}
}
