
function ClippingSettings() {
  this.name = "Clipping Settings"

  // Signal Threshold
  var clippingSettings
  var signalThreshold;
  var signalThresholdOptions = [50, 100, 150, 200, 240];

  this.onResize = function() {
    clippingSettings = {x: width/2 - 50, y: 200}
  }
  this.onResize();

  // create DOM elements only on show
  // avoids multiple elements created in draw loop
  this.open = function() {

    // SIGNAL THRESHOLD
    signalThreshold = createSelect();
    signalThreshold.position(clippingSettings.x, clippingSettings.y);
    signalThreshold.size(100, 25)
    signalThresholdOptions.forEach(option => signalThreshold.option(option));
    signalThreshold.selected(vis.selectedVisual.signalThreshold);
    signalThreshold.changed(() => vis.selectedVisual.setSignalThreshold(signalThreshold.value()));

  }

  // draw canvas elements of settings pane
  this.draw = function() {
    text(this.name, width / 2, 100);

    text('Signal Threshold (Hz):', clippingSettings.x, clippingSettings.y - 10)
  }

  // remove DOM elements on hide
  // ensures elements do not overlap with current canvas
  this.close = function() {
    signalThreshold.remove();
  }

}