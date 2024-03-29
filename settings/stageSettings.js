// Constructor to create user customisable settings for clipping visualiser
// @param name: Title to be used for settings pane
// @method onResize: set size values in resize function to enable responsiveness
// @method open: create settings elements on opening settings pane
// @method draw: create labels for settings
// @method close: remove settings elements on closing settings pane
function StageSettings() {
  this.name = "Stage Settings"

  let settings = [];

  let stageLightSettings; //store location parameters for stageLights
  let featureLightSettings; //store location parameters for featureLights

  const energyValues = ['treble', 'highMid', 'mid', 'lowMid', 'bass'];

  // set settings location
  this.onResize = function() {
    stageLightSettings = {x: (width/2) - (width/4), y: 200}
    featureLightSettings = {x: (width/2) + (width/4) - 100, y: 200}
  }
  this.onResize();

  // create DOM elements only on open
  // avoids multiple elements created in draw loop
  this.open = function() {

    // STAGE LIGHTS
    // Number of lights
    let stageLightAmt = new Slider( stageLightSettings.x, stageLightSettings.y + 125,
                                0, 10, 1, vis.selectedVisual.stageLight.amount,
                                () => vis.selectedVisual.setLightAmount('stageLight', stageLightAmt.value)
                              );

    // Energy to follow
    let stageLightEnergy = new Select(  stageLightSettings.x,
                                    stageLightSettings.y + 200,
                                    energyValues,
                                    vis.selectedVisual.stageLight.energy,
                                    () => vis.selectedVisual.setLightEnergy('stageLight', stageLightEnergy.value)
                                  );

    // Light Colour
    let stageLightColour = new ColourPicker(  stageLightSettings.x, stageLightSettings.y + 300,
                                          vis.selectedVisual.stageLight.colour,
                                          () => vis.selectedVisual.setLightColour('stageLight', stageLightColour.colour)
                                        );
  
    // FEATURE LIGHTS
    // Number of lights
    let featureLightAmt = new Slider( featureLightSettings.x, featureLightSettings.y + 125,
                                  0, 10, 1, vis.selectedVisual.featureLight.amount,
                                  () => vis.selectedVisual.setLightAmount('featureLight', featureLightAmt.value)
                                );

    // Energy to follow
    let featureLightEnergy = new Select(  featureLightSettings.x,
                                      featureLightSettings.y + 200,
                                      energyValues,
                                      vis.selectedVisual.featureLight.energy,
                                      () => vis.selectedVisual.setLightEnergy('featureLight', featureLightEnergy.value)
                                    );

    // Light Colour   
    let featureLightColour = new ColourPicker(  featureLightSettings.x, featureLightSettings.y + 300,
                                            vis.selectedVisual.featureLight.colour,
                                            () => vis.selectedVisual.setLightColour('featureLight', featureLightColour.colour)
                                          );

    settings.push(stageLightAmt, stageLightEnergy, stageLightColour, featureLightAmt, featureLightEnergy, featureLightColour)

  }

  // Draw labels for settings
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

  // remove DOM elements on close
  // ensures elements do not overlap with current canvas
  this.close = function() {
    settings.forEach(setting => setting.remove());
  }
}