
function WavepatternSettings() {
  this.name = "Wavepattern Settings"

  var wavepatternSettings;
  var offsetXAmt;
  var offsetYAmt;

  this.onResize = function() {
    wavepatternSettings = {x: width/2, y: 200}
  }
  this.onResize();

  this.open = function() {
    offsetXAmt = createSlider(0, 50, vis.selectedVisual.offsetX, 1);
    offsetXAmt.position(wavepatternSettings.x, wavepatternSettings.y + 100);
    offsetXAmt.changed(() => vis.selectedVisual.offsetX = offsetXAmt.value());

    offsetYAmt = createSlider(0, 50, vis.selectedVisual.offsetY, 1);
    offsetYAmt.position(wavepatternSettings.x, wavepatternSettings.y + 200);
    offsetYAmt.changed(() => vis.selectedVisual.offsetY = offsetYAmt.value());
  }

  this.draw = function() {
    text(this.name, width / 2, 100);

    text('X Offset: ' + vis.selectedVisual.offsetX, wavepatternSettings.x, wavepatternSettings.y + 75)
    text('Y Offset: ' + vis.selectedVisual.offsetY, wavepatternSettings.x, wavepatternSettings.y + 175)
  }

  this.close = function() {
    offsetXAmt.remove();
    offsetYAmt.remove();
  }
}