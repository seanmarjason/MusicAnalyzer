//draw the waveform to the screen
function Stage() {

  var self = this;
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
  this.resize = function() {
    stage.height = height / 4 * 3;
    stage.depth = height / 4;
    desk.height = 250;
    desk.width = width / 4 * 2;
    speakers.height = 400;
    speakers.width = 100;
    lightRack.height = height / 5;
  }
  this.resize();

  // define key settings for each froup of lights
  this.stageLight = {
    amount: 5,
    energy: 'treble',
    colour: color(255, 255, 255)
  }

  this.featureLight = {
    amount: 5,
    energy: 'bass',
    colour: color(255, 255, 255)
  }

  // arrays to hold lights to retain position values
  var stageLights = [];
  var featureLights = [];

  // create stage lights
  var createStageLights = function(numOfLights) {
    stageLights.length = 0;
    for(i = 0; i < numOfLights; i++) {
      var int = width / numOfLights
      var x = (int * i) + (int / 2);
      var y = lightRack.height;
      stageLights.push({x, y})
    }
  }

  // create feature lights
  var createFeatureLights = function(numOfLights) {
    featureLights.length = 0;
    for(i = 0; i < numOfLights; i++) {
      var int = desk.width / numOfLights;
      var x = (width / 4 + (int * i) + (int / 2));
      var y = stage.height + (desk.height / 2)
      featureLights.push({x, y});
    }
  }

  // update amount of lights
  this.setLightAmount = function (lightType, amount) {
    this[lightType].amount = amount;
  }

  // update energy for lights to follow
  this.setLightEnergy = function (lightType, energy) {
    this[lightType].energy = energy;
  }

  // update colour of lights
  this.setLightColour = function (lightType, colour) {
    this[lightType].colour = colour;
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

    createStageLights(this.stageLight.amount);
    createFeatureLights(this.featureLight.amount);

    // draw stage lights
    push();
    noStroke();
    var stageLightIntensity = map(stageAmplitude.getLevel(), 0, 1, 10, 255);
    this.stageLight.colour.setAlpha(stageLightIntensity);
    fill(this.stageLight.colour);
    var stageLightSize = map(stageFourier.getEnergy(this.stageLight.energy), 0, 255, 10, 100);
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
    this.featureLight.colour.setAlpha(featureLightIntensity);
    fill(this.featureLight.colour);
    var featureLightSize = map(stageFourier.getEnergy(this.featureLight.energy), 0, 255, 10, 100);
    featureLights.forEach(function(light) {
      circle(light.x, light.y, featureLightSize)
      triangle(light.x, light.y, light.x - featureLightSize, light.y - 200, light.x + featureLightSize, light.y - 200);
    });
    pop();
	};

	this.reset = function() {

	}
}