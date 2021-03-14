// Constructor to create user customisable settings for clipping visualiser
// @param name: Title to be used for settings pane
// @method onResize: set size values in resize function to enable responsiveness
// @method open: create settings elements on opening settings pane
// @method draw: create labels for settings
// @method close: remove settings elements on closing settings pane
function WavepatternSettings() {
  this.name = "Wavepattern Settings"

  let settings = [];
  let wavepatternSettings; //store location parametersn

  // set settings location
  this.onResize = function() {
    wavepatternSettings = {x: width/2, y: 200}
  }
  this.onResize();

  // create DOM elements only on open
  // avoids multiple elements created in draw loop
  this.open = function() {
    
    let offsetXAmt = new Slider(  wavepatternSettings.x, wavepatternSettings.y + 100,
                              0, 50, 1, vis.selectedVisual.offset.x,
                              () => vis.selectedVisual.setOffset('x', offsetXAmt.value)
                            );

    let offsetYAmt = new Slider(  wavepatternSettings.x, wavepatternSettings.y + 200,
                              0, 50, 1, vis.selectedVisual.offset.y,
                              () => vis.selectedVisual.setOffset('y', offsetYAmt.value)
                            );

    settings.push(offsetXAmt, offsetYAmt);

  }

  // Draw labels for settings
  this.draw = function() {
    text(this.name, width / 2, 100);

    text('X Offset: ' + vis.selectedVisual.offset.x, wavepatternSettings.x, wavepatternSettings.y + 75)
    text('Y Offset: ' + vis.selectedVisual.offset.y, wavepatternSettings.x, wavepatternSettings.y + 175)
  }

  // remove DOM elements on close
  // ensures elements do not overlap with current canvas
  this.close = function() {
    settings.forEach(setting => setting.remove());
  }
}