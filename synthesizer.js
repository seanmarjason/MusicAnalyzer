//draw the synthesizer to the screen
function Synthesizer() {

  //vis name
  this.name = "synthesizer";
  this.x = 500;
  this.y = height / 2;

  const keys = [
    {'note': 'C4', 'freq': 261.6256, 'position': 1, 'type': 'white'},
    {'note': 'C#4', 'freq': 277.1826, 'position': 1.5, 'type': 'black'},
    {'note': 'D4', 'freq': 293.6648, 'position': 2, 'type': 'white'},
    {'note': 'D#4', 'freq': 311.1270, 'position': 2.5, 'type': 'black'},
    {'note': 'E4', 'freq': 329.6276, 'position': 3, 'type': 'white'},
    {'note': 'F4', 'freq': 349.2282, 'position': 4, 'type': 'white'},
    {'note': 'F#4', 'freq': 369.9944, 'position': 4.5, 'type': 'black'},
    {'note': 'G4', 'freq': 391.9954, 'position': 5, 'type': 'white'},
    {'note': 'G#4', 'freq': 415.3047, 'position': 5.5, 'type': 'black'},
    {'note': 'A4', 'freq': 440.0000, 'position': 6, 'type': 'white'},
    {'note': 'A#4', 'freq': 466.1638, 'position': 6.5, 'type': 'black'},
    {'note': 'B4', 'freq': 493.8833, 'position': 7, 'type': 'white'},
    {'note': 'C5', 'freq': 523.2511, 'position': 8, 'type': 'white'},
  ]

  let waveType = 'triangle';

  const wave = new p5.Oscillator();

  let octaves = 1;
  const octaveKeys = 12;
  let keyWidth = 50;
  let keyWidthSmall = 25
  let keyHeight = 200;
  let keyHeightSmall = 120;

	//draw the synthesizer to the screen
	this.draw = function() {

    // draw keyboard
    for (i = 0; i < keys.length; i++) {
      // white keys
      if (keys[i].type == 'white') {
        fill(255)
        rect(this.x + keys[i].position * keyWidth, this.y, keyWidth, keyHeight);
      }
    }
    for (i = 0; i < keys.length; i++) {
      // black keys
      if (keys[i].type == 'black') {
        fill(0);
        rect((this.x + (keys[i].position * 2) * keyWidthSmall) + (keyWidthSmall/2), this.y, keyWidthSmall, keyHeightSmall);
      }
    }
  };
  
  this.mousePressed = function() {
    if(mouseY > this.y && mouseY < this.y + keyHeight) {
      console.log('pressed')
      for(i = 0; i < keys.length; i++) {
        if( mouseX > (this.x + keys[i].position * keyWidth) 
            && mouseX < ((this.x + keys[i].position * keyWidth) + keyWidth)){
              console.log(keys[i].note);
              this.playNote(keys[i].freq);
              break
            }
      }
    }
  }

  this.playNote = function(frequency) {
    wave.start();
    wave.setType(waveType);
    wave.amp(0.5);
    wave.freq(frequency);
  }

  this.mouseReleased = function() {
    wave.stop();
  }
}