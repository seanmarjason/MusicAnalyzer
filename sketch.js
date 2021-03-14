//global for the controls and input 
let controls = null;
//store visualisations in a container
let vis = null;
//variable for the p5 sound object
let sound = null;
let soundTime = 0;

function preload(){
	// load default sound
	sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(18, 18, 18);
	 controls = new ControlsAndInput();
	 controls.setup();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Clipping());
	 vis.add(new Levels());
	 vis.add(new WavePattern());
	 vis.add(new Stage());
	 vis.add(new Synthesizer());

	 settings = new Settings();
	 settings.add(new ClippingSettings());
	 settings.add(new LevelsSettings());
	 settings.add(new WavepatternSettings());
	 settings.add(new StageSettings());
	 settings.add(new SynthesizerSettings());

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the selected visualisation's controls
	settings.draw();
	//draw the controls on top.
	controls.draw();
	soundTime = sound.currentTime();
}

function mouseClicked(){
	if (vis) {
		controls.mousePressed();
	}
}

function mousePressed() {
	if(vis && vis.selectedVisual.mousePressed) {
		vis.selectedVisual.mousePressed();
	}
}

function mouseReleased() {
	if(vis && vis.selectedVisual.mouseReleased) {
		vis.selectedVisual.mouseReleased();
	}
}

function keyPressed(){
	if (vis) {
		controls.keyPressed(keyCode);
		settings.keyPressed(keyCode);
	}
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);

	vis.onResize();

	controls.trackNavigator.onResize();
	controls.fullscreenButton.onResize();

	if (settings.open) {
		settings.open = false;
		settings.selectedSettings.close();
	}
	settings.onResize();
}
