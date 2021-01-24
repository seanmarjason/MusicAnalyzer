
function SynthesizerSettings() {
  this.name = "Synthesizer Settings"

  this.open = function() {

  }

  this.draw = function() {
    fill(255);
    textSize(18);
    rect(0, 75, width, height / 2);
    fill(0);
    text(this.name, width / 2, 100);
  }

  this.close = function() {
    
  }
}