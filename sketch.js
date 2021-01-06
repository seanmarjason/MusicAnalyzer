//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
var soundTime = 0;

function preload(){
	// load default sound
	sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(18, 18, 18);
	 controls = new ControlsAndInput();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Clipping());
	 vis.add(new Levels());
	 vis.add(new WavePattern());
	 vis.add(new Stage());
	 vis.add(new Synthesizer());

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
	soundTime = sound.currentTime();
}

function mouseClicked(){
	controls.mousePressed();
}

function mousePressed() {
	if(vis.selectedVisual.mousePressed) {
		vis.selectedVisual.mousePressed();
	}
}

function mouseReleased() {
	if(vis.selectedVisual.mouseReleased) {
		vis.selectedVisual.mouseReleased();
	}
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
	controls.trackNavigator.onResize();
	controls.fullscreenButton.onResize();
}
