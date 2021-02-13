
function ClippingSettings() {
  this.name = "Clipping Settings"

  // Signal Threshold
  var signalThreshold;
  var signalThresholdOptions = [50, 100, 150, 200, 240];
  var signalThresholdPos

  this.onResize = function() {
    signalThresholdPos = {x: width/2 - 50, y: 200}
  }
  this.onResize();

  // create DOM elements only on show
  // avoids multiple elements created in draw loop
  this.open = function() {

    // SIGNAL THRESHOLD
    signalThreshold = createSelect();
    signalThreshold.position(signalThresholdPos.x, signalThresholdPos.y);
    signalThreshold.size(100, 25)
    signalThresholdOptions.forEach(option => signalThreshold.option(option));
    signalThreshold.selected(vis.selectedVisual.signalThreshold);
    signalThreshold.changed(() => vis.selectedVisual.setSignalThreshold(signalThreshold.value()));

  }

  // draw canvas elements of settings pane
  this.draw = function() {
    fill(255);
    textSize(18);
    rect(0, 75, width, height / 2);
    fill(0);
    text(this.name, width / 2, 100);

    text('Signal Threshold (Hz):', signalThresholdPos.x, signalThresholdPos.y - 10)
  }

  // remove DOM elements on hide
  // ensures elements do not overlap with current canvas
  this.close = function() {
    signalThreshold.remove();
  }

}