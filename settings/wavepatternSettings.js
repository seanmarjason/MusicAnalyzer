
function WavepatternSettings() {
  this.name = "Wavepattern Settings"

  this.draw = function() {
    fill(255);
    rect(0, 75, width, height / 2);
    fill(0);
    text(this.name, width / 2, height / 4);
  }
}