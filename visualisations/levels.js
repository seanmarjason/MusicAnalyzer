// Constructor to display visualisation to analyse track levels per signal bin
// @param name: Title to be used for menu
// @param plots: Signal bins to be displayed
// @method resize: set size values in resize function to enable responsiveness
// @method draw: draw visualisation to canvas
// @method togglePlot: enable / disable a plot in visualisation
// @method drawNeedle: place needle in position of current signal for bin
// @method ticks: place ticks on plot
function Levels() {
	//name of the visualisation
	this.name = "Analyze Levels";

	const levelsFourier = new p5.FFT();

	//how large is the arc of the needle plot.
	const minAngle = PI + PI / 10;
	const maxAngle = TWO_PI - PI / 10;

	// setup default plots to draw
	this.plots = {
		bass: true,
		lowMid: true,
		mid: false,
		highMid: true,
		treble: true
	}

	let plotsEnabled;
	let plotsAcross;
	let plotsDown;

	// set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
	this.resize = function() {
		this.pad = width / 20;
		this.plotWidth = (width - this.pad) / plotsAcross;
		this.plotHeight = (height - this.pad) / plotsDown;
		this.dialRadius = (min(this.plotWidth, this.plotHeight) - this.pad) / 2 - 50;
	};

	// draw the plots to the screen
	this.draw = function() {

		// select the plots to be draw in this loop
		plotsEnabled = Object.keys(this.plots).filter(key => (
			this.plots[key] === true)
		);

		// calculate plot positioning based on number of plots enabled
		plotsAcross = Math.ceil(plotsEnabled.length/2);
		plotsDown = 2;

		// set size of plots based on number of plots to display
		this.resize();

		//create an array amplitude values from the fft.
		const spectrum = levelsFourier.analyze();

		//iterator for selecting frequency bin.
		let currentBin = 0;

		push();
		fill('#f0f2d2');
		//nested for loop to place plots in grid
		for (let i = 0; i < plotsDown; i++) {
			for (let j = 0; j < plotsAcross; j++) {

				// exit loop if all plots drawn
				if(currentBin >= plotsEnabled.length) {
					break;
				}

				//calculate the size of the plots
				const x = this.pad + j * this.plotWidth;
				const y = this.pad + i * this.plotHeight + 25;
				const w = this.plotWidth - this.pad;
				const h = this.plotHeight - this.pad;

				//draw a rectangle at that location and size
				rect(x, y, w, h);
				//add arcs for level guage and max level
				push();
				stroke(000000);
				arc(x + w / 2, y + h, this.dialRadius * 2 - 10, this.dialRadius * 2 - 10, minAngle, maxAngle)
				stroke('#CC4436');
				strokeWeight(10);
				strokeCap(SQUARE);
				noFill();
				arc(x + w / 2, y + h, this.dialRadius * 2 - 20, this.dialRadius * 2 - 20, minAngle + (PI / 10 * 6), maxAngle);
				pop();
				//add on the ticks
				this.ticks(x + w / 2, y + h);

				const energy = levelsFourier.getEnergy(plotsEnabled[currentBin]);

				//add label for plot
				push();
				textAlign(CENTER);
				textSize(12);
				fill(000000);
				text(plotsEnabled[currentBin] + ' (amp)', x + (w/2), y + h - 50);
				pop();

				//add the needle
				this.drawNeedle(energy, x + w / 2, y + h);
				currentBin++;
			}
		}

		pop();
	};

	this.togglePlot = function(plot) {
		this.plots[plot] = !this.plots[plot];
	}

	// draws a needle to an individual plot
	// @param energy: The energy for the current frequency
	// @param centreX: central x coordinate of the plot rectangle
	// @param bottomY: The bottom y coordinate of the plot rectangle
	this.drawNeedle = function(energy, centreX, bottomY) {
		push();
		stroke('#333333');
		//translate so 0 is at the bottom of the needle
		translate(centreX, bottomY);
		//map the energy to the angle for the plot
		theta = map(energy, 0, 255, minAngle, maxAngle);
		//calculate x and y coorindates from angle for the length of needle
		const x = this.dialRadius * cos(theta);
		const y = this.dialRadius * sin(theta);
		//draw the needle
		line(0, 0, x, y);
		pop();
	};

	// draw the graph ticks on an indivisual plot
	// @param centreX: central x coordinate of the plot rectangle
	// @param bottomY: The bottom y coordinate of the plot rectangle
	// @param freqLabel: Label denoting the frequency of the plot
	this.ticks = function(centreX, bottomY) {
		// 8 ticks from pi to 2pi
		let nextTickAngle = minAngle;
		push();
		stroke('#333333');
		fill('#333333');
		translate(centreX, bottomY);
		//draw the semi circle for the botttom of the needle
		arc(0, 0, 20, 20, PI, 2 * PI);
		textAlign(CENTER);
		textSize(12);

		for (let i = 0; i < 9; i++) {
			//for each tick work out the start and end coordinates of
			//based on its angle from the needle's origin.
			const x = this.dialRadius * cos(nextTickAngle);
			const x1 = (this.dialRadius + 5) * cos(nextTickAngle);

			const y = (this.dialRadius) * sin(nextTickAngle);
			const y1 = (this.dialRadius + 5) * sin(nextTickAngle);

			const tag = (map(i, 0, 8, 0, 255)).toFixed();

			strokeWeight(2);
			line(x, y, x1, y1);
			strokeWeight(1);
			text(tag, x, y - 15);
			nextTickAngle += PI / 10;
		}
		pop();
	};
}