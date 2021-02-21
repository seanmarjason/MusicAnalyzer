
function StageSettings() {
  this.name = "Stage Settings"

  // Stage Lights
  var stageLightSettings;
  var stageLightAmt;
  var stageLightEnergy;
  var stageLightColour;

  // Feature Lights
  var featureLightSettings;
  var featureLightAmt;
  var featureLightEnergy;
  var featureLightColour;

  var energyValues = ['treble', 'highMid', 'mid', 'lowMid', 'bass'];

  this.onResize = function() {
    stageLightSettings = {x: (width/2) - (width/4), y: 200}
    featureLightSettings = {x: (width/2) + (width/4) - 100, y: 200}
  }
  this.onResize();

  this.open = function() {

    // STAGE LIGHTS
    // Number of lights
    stageLightAmt = new Slider( stageLightSettings.x, stageLightSettings.y + 125,
                                0, 10, 1, vis.selectedVisual.stageLight.amount,
                                () => vis.selectedVisual.setLightAmount('stageLight', stageLightAmt.value)
                              );

    // Energy to follow
    stageLightEnergy = new Select(  stageLightSettings.x,
                                    stageLightSettings.y + 200,
                                    energyValues,
                                    vis.selectedVisual.stageLight.energy,
                                    () => vis.selectedVisual.setLightEnergy('stageLight', stageLightEnergy.value)
                                  );

    // Light Colour
    stageLightColour = new ColourPicker(  stageLightSettings.x, stageLightSettings.y + 300,
                                          vis.selectedVisual.stageLight.colour,
                                          () => vis.selectedVisual.setLightColour('stageLight', stageLightColour.colour)
                                        );

                                        
    // FEATURE LIGHTS
    // Number of lights
    featureLightAmt = new Slider( featureLightSettings.x, featureLightSettings.y + 125,
                                  0, 10, 1, vis.selectedVisual.featureLight.amount,
                                  () => vis.selectedVisual.setLightAmount('featureLight', featureLightAmt.value)
                                );

    // Energy to follow
    featureLightEnergy = new Select(  featureLightSettings.x,
                                      featureLightSettings.y + 200,
                                      energyValues,
                                      vis.selectedVisual.featureLight.energy,
                                      () => vis.selectedVisual.setLightEnergy('featureLight', featureLightEnergy.value)
                                    );

    // Light Colour   
    featureLightColour = new ColourPicker(  featureLightSettings.x, featureLightSettings.y + 300,
                                            vis.selectedVisual.featureLight.colour,
                                            () => vis.selectedVisual.setLightColour('featureLight', featureLightColour.colour)
                                          );

  }

  this.draw = function() {
    text(this.name, width / 2, 100);

    text('Stage Lights', stageLightSettings.x, stageLightSettings.y)
    text('Number of Lights: ' + vis.selectedVisual.stageLight.amount, stageLightSettings.x, stageLightSettings.y + 100)
    text('Responding to:', stageLightSettings.x, stageLightSettings.y + 190)
    text('Colour:', stageLightSettings.x, stageLightSettings.y + 280)

    text('Feature Lights', featureLightSettings.x, featureLightSettings.y)
    text('Number of Lights: ' + vis.selectedVisual.featureLight.amount, featureLightSettings.x, featureLightSettings.y + 100)
    text('Responding to:', featureLightSettings.x, featureLightSettings.y + 190)
    text('Colour:', featureLightSettings.x, featureLightSettings.y + 280)

  }

  this.close = function() {
    stageLightAmt.remove();
    stageLightEnergy.remove();
    stageLightColour.remove();

    featureLightAmt.remove();
    featureLightEnergy.remove();
    featureLightColour.remove();
  }
}