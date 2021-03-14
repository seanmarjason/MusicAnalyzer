// Constructor to create user customisable settings for clipping visualiser
// @param name: Title to be used for settings pane
// @method onResize: set size values in resize function to enable responsiveness
// @method open: create settings elements on opening settings pane
// @method draw: create labels for settings
// @method close: remove settings elements on closing settings pane
function ClippingSettings() {
  this.name = "Clipping Settings"

  let settings = [];
  let clippingSettings //store location parameters

  const signalThresholdOptions = [50, 100, 150, 200, 240];

  // set settings location
  this.onResize = function() {
    clippingSettings = {x: width/2 - 50, y: 200}
  }
  this.onResize();

  // create DOM elements only on open
  // avoids multiple elements created in draw loop
  this.open = function() {

    let signalThreshold = new Select( clippingSettings.x, 
                                  clippingSettings.y,
                                  signalThresholdOptions,
                                  vis.selectedVisual.signalThreshold,
                                  () => vis.selectedVisual.setSignalThreshold(signalThreshold.value)
                                );

    settings.push(signalThreshold);
  }

  // draw canvas elements of settings pane
  this.draw = function() {
    text(this.name, width / 2, 100);
    text('Signal Threshold (Hz):', clippingSettings.x, clippingSettings.y - 10)
  }

  // remove DOM elements on close
  // ensures elements do not overlap with current canvas
  this.close = function() {
    settings.forEach(setting => setting.remove());
  }

}