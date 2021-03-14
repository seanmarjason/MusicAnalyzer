
function WavepatternSettings() {
  this.name = "Wavepattern Settings"

  let settings = [];
  let wavepatternSettings;

  this.onResize = function() {
    wavepatternSettings = {x: width/2, y: 200}
  }
  this.onResize();

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

  this.draw = function() {
    text(this.name, width / 2, 100);

    text('X Offset: ' + vis.selectedVisual.offset.x, wavepatternSettings.x, wavepatternSettings.y + 75)
    text('Y Offset: ' + vis.selectedVisual.offset.y, wavepatternSettings.x, wavepatternSettings.y + 175)
  }

  this.close = function() {
    settings.forEach(setting => setting.remove());
  }
}