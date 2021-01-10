//draw the waveform to the screen
function Stage() {
	//vis name
  this.name = "Stage Visualiser";

  var stageFourier = new p5.FFT();
  var stageAmplitude = new p5.Amplitude();
  
  var stage = {};
  var desk = {};
  var speakers = {};
  var lightRack = {};

  // set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
  this.onResize = function() {
    stage.height = height / 4 * 3;
    stage.depth = height / 4;
    desk.height = 250;
    desk.width = width / 4 * 2;
    speakers.height = 400;
    speakers.width = 100;
    lightRack.height = height / 5;
  }
  this.onResize();

  // define the number of lights to be drawn
  this.stageLightAmt = 5;
  this.featureLightAmt = 5;

  // arrays to hold lights to retain position values
  var stageLights = [];
  var featureLights = [];

  // create stage lights
  for(i = 0; i < this.stageLightAmt; i++) {
    var int = width / this.stageLightAmt
    var x = (int * i) + (int / 2);
    var y = lightRack.height;
    stageLights.push({x, y})
  }

  // create feature lights
  for(i = 0; i < this.featureLightAmt; i++) {
    var int = desk.width / this.featureLightAmt;
    var x = (width / 4 + (int * i) + (int / 2));
    var y = stage.height + (desk.height / 2)
    featureLights.push({x, y});
  }


	//draw the stage to the screen
	this.draw = function() {
		var energy = stageFourier.analyze();

    // draw stage background
    push();
    fill(10, 10, 10);
    rect(0, stage.height, width, stage.depth); //stage
    rect(0, 0, width, height / 5); //light assembley
    pop();

    // draw stage lights
    push();
    noStroke();
    var stageLightIntensity = map(stageAmplitude.getLevel(), 0, 1, 10, 255);
    fill(255, 255, 255, stageLightIntensity);
    var stageLightSize = map(stageFourier.getEnergy('treble'), 0, 255, 10, 100);
    stageLights.forEach(function(light) {
      circle(light.x, light.y, stageLightSize)
      triangle(light.x, light.y, light.x - stageLightSize, stage.height, light.x + stageLightSize, stage.height);
    });
    pop();

    // draw kit
    push();
    fill(20, 20, 20);
    rect(width / 4, stage.height - desk.height + (desk.height / 2), desk.width, desk.height); //desk
    rect(width / 8, stage.height - speakers.height + (speakers.height / 2), speakers.width, speakers.height); //speakers set 1
    rect(width / 8 * 7 - speakers.width, stage.height - speakers.height + (speakers.height / 2), speakers.width, speakers.height); //speakers set 2
    pop();

    // draw feature lights
    push();
    noStroke();
    var featureLightIntensity = map(stageAmplitude.getLevel(), 0, 1, 10, 255);
    fill(255, 255, 255, featureLightIntensity);
    var featureLightSize = map(stageFourier.getEnergy('bass'), 0, 255, 10, 100);
    featureLights.forEach(function(light) {
      circle(light.x, light.y, featureLightSize)
      triangle(light.x, light.y, light.x - featureLightSize, light.y - 200, light.x + featureLightSize, light.y - 200);
    });
    pop();
	};

	this.reset = function() {

	}
}