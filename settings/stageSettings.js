
function StageSettings() {
  this.name = "Stage Settings"

  // Stage Lights
  var stageLightSettings = {x: (width/2) - (width/4), y: 200}
  var stageLightAmt;
  var stageLightEnergy;
  var stageLightColour;

  // Feature Lights
  var featureLightSettings = {x: (width/2) + (width/4), y: 200}
  var featureLightAmt;
  var featureLightEnergy;
  var featureLightColour;


  this.open = function() {

    // STAGE LIGHTS
    // Number of lights
    stageLightAmt = createSlider(0, 10, vis.selectedVisual.stageLight.amount, 1);
    stageLightAmt.position(stageLightSettings.x, stageLightSettings.y + 125)
    stageLightAmt.changed(() => vis.selectedVisual.setStageLightAmt(stageLightAmt.value()));

    // Energy to follow
    stageLightEnergy = createSelect();
    stageLightEnergy.position(stageLightSettings.x, stageLightSettings.y + 200);
    ['treble', 'highMid', 'mid', 'lowMid', 'bass'].forEach(item => stageLightEnergy.option(item));
    stageLightEnergy.value(vis.selectedVisual.stageLight.energy);
    stageLightEnergy.changed(() => vis.selectedVisual.stageLight.energy = stageLightEnergy.value());

    // Light Colour
    stageLightColour = createColorPicker(vis.selectedVisual.stageLight.colour);
    stageLightColour.position(stageLightSettings.x, stageLightSettings.y + 300);
    stageLightColour.changed(() => vis.selectedVisual.stageLight.colour = stageLightColour.color());

    // FEATURE LIGHTS
    // Number of lights
    featureLightAmt = createSlider(0, 10, vis.selectedVisual.featureLight.amount, 1);
    featureLightAmt.position(featureLightSettings.x, featureLightSettings.y + 125)
    featureLightAmt.changed(() => vis.selectedVisual.setFeatureLightAmt(featureLightAmt.value()));

    // Energy to follow
    featureLightEnergy = createSelect();
    featureLightEnergy.position(featureLightSettings.x, featureLightSettings.y + 200);
    ['treble', 'highMid', 'mid', 'lowMid', 'bass'].forEach(item => featureLightEnergy.option(item));
    featureLightEnergy.value(vis.selectedVisual.featureLight.energy);
    featureLightEnergy.changed(() => vis.selectedVisual.featureLight.energy = featureLightEnergy.value());

    // Light Colour
    featureLightColour = createColorPicker(vis.selectedVisual.featureLight.colour);
    featureLightColour.position(featureLightSettings.x, featureLightSettings.y + 300);
    featureLightColour.changed(() => vis.selectedVisual.featureLight.colour = featureLightColour.color());
    
  }

  this.draw = function() {
    fill(255);
    textSize(18);
    rect(0, 75, width, height / 2);
    fill(0);
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