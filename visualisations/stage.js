// Constructor to display visualisation to compare stage light arrangements
// @param name: Title to be used for menu
// @param stageLight: define stage light amount, energy and colour
// @param featureLight: define feature light amount, energy and colour
// @method resize: set size values in resize function to enable responsiveness
// @method draw: draw visualisation to canvas
// @method setLightAmount: set new amount of lights for a given light type
// @method setLightEnergy: set new energy for lights to track for a given light type
// @method setLightColour: set new light colour for a given light type
function Stage() {

  const self = this;
  this.name = "Stage Visualiser";

  const stageFourier = new p5.FFT();
  const stageAmplitude = new p5.Amplitude();
  
  let stage = {};
  let desk = {};
  let speakers = {};
  let lightRack = {};

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

  // arrays to hold lights to retain position values
  let stageLights = [];
  let featureLights = [];

  // create stage lights
  const createStageLights = function(numOfLights) {
    stageLights.length = 0;
    for(let i = 0; i < numOfLights; i++) {
      const int = width / numOfLights
      const x = (int * i) + (int / 2);
      const y = lightRack.height;
      stageLights.push({x, y})
    }
  }

  // create feature lights
  const createFeatureLights = function(numOfLights) {
    featureLights.length = 0;
    for(let i = 0; i < numOfLights; i++) {
      const int = desk.width / numOfLights;
      const x = (width / 4 + (int * i) + (int / 2));
      const y = stage.height + (desk.height / 2)
      featureLights.push({x, y});
    }
  }

	//draw the stage to the screen
	this.draw = function() {
		const energy = stageFourier.analyze();

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
    const stageLightIntensity = map(stageAmplitude.getLevel(), 0, 1, 10, 255);
    this.stageLight.colour.setAlpha(stageLightIntensity);
    fill(this.stageLight.colour);
    const stageLightSize = map(stageFourier.getEnergy(this.stageLight.energy), 0, 255, 10, 100);
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
    const featureLightIntensity = map(stageAmplitude.getLevel(), 0, 1, 10, 255);
    this.featureLight.colour.setAlpha(featureLightIntensity);
    fill(this.featureLight.colour);
    const featureLightSize = map(stageFourier.getEnergy(this.featureLight.energy), 0, 255, 10, 100);
    featureLights.forEach(function(light) {
      circle(light.x, light.y, featureLightSize)
      triangle(light.x, light.y, light.x - featureLightSize, light.y - 200, light.x + featureLightSize, light.y - 200);
    });
    pop();
	};

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

}