function Spectrum(){
	this.name = "spectrum";

	var bins = 64;
	var binWidth = width / bins;
	var binHeight = height - 100;

	this.draw = function(){
		push();
		var spectrum = fourier.analyze(bins);
		noStroke();

		for(var i = 0; i<bins; i++){

			//fade the colour of the bin from green to red
			var g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			//draw each bin as a rectangle from the left of the screen across
			var x = map(i, 0, bins, 0, width);
			var h = -binHeight + map(spectrum[i], 0, 255, binHeight, 0);
			rect(x, height, binWidth - 2, h);
		}  		
		pop();
	};
}
