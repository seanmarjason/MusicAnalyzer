//draw the synthesizer to the screen
function Synthesizer() {

  //vis name
  this.name = "synthesizer";
  this.x = 350;
  this.y = height / 2;

  let img = loadImage('assets/Treble_Clef_White.png');

  const keys = [
    {'note': 'C3', 'freq': 130.8128, 'position': 1, 'type': 'white'},
    {'note': 'C#3', 'freq': 138.5913, 'position': 1.5, 'type': 'black'},
    {'note': 'D3', 'freq': 146.8324, 'position': 2, 'type': 'white'},
    {'note': 'D#3', 'freq': 155.5635, 'position': 2.5, 'type': 'black'},
    {'note': 'E3', 'freq': 164.8138, 'position': 3, 'type': 'white'},
    {'note': 'F3', 'freq': 174.6141, 'position': 4, 'type': 'white'},
    {'note': 'F#3', 'freq': 184.9972, 'position': 4.5, 'type': 'black'},
    {'note': 'G3', 'freq': 195.9977, 'position': 5, 'type': 'white'},
    {'note': 'G#3', 'freq': 207.6523, 'position': 5.5, 'type': 'black'},
    {'note': 'A3', 'freq': 220.0000, 'position': 6, 'type': 'white'},
    {'note': 'A#3', 'freq': 233.0819, 'position': 6.5, 'type': 'black'},
    {'note': 'B3', 'freq': 246.9417, 'position': 7, 'type': 'white'},
    {'note': 'C4', 'freq': 261.6256, 'position': 8, 'type': 'white'},
    {'note': 'C#4', 'freq': 277.1826, 'position': 8.5, 'type': 'black'},
    {'note': 'D4', 'freq': 293.6648, 'position': 9, 'type': 'white'},
    {'note': 'D#4', 'freq': 311.1270, 'position': 9.5, 'type': 'black'},
    {'note': 'E4', 'freq': 329.6276, 'position': 10, 'type': 'white'},
    {'note': 'F4', 'freq': 349.2282, 'position': 11, 'type': 'white'},
    {'note': 'F#4', 'freq': 369.9944, 'position': 11.5, 'type': 'black'},
    {'note': 'G4', 'freq': 391.9954, 'position': 12, 'type': 'white'},
    {'note': 'G#4', 'freq': 415.3047, 'position': 12.5, 'type': 'black'},
    {'note': 'A4', 'freq': 440.0000, 'position': 13, 'type': 'white'},
    {'note': 'A#4', 'freq': 466.1638, 'position': 13.5, 'type': 'black'},
    {'note': 'B4', 'freq': 493.8833, 'position': 14, 'type': 'white'},
    {'note': 'C5', 'freq': 523.2511, 'position': 15, 'type': 'white'},
  ]

  const blackKeys = keys.filter((key) => key.type == 'black');
  const whiteKeys = keys.filter((key) => key.type == 'white');

  // keyboard parameters
  let keyWidth = 50;
  let keyWidthSmall = 25
  let keyHeight = 200;
  let keyHeightSmall = 120;
  let note = '';

  // Oscillator 1
  const osc1 = new p5.Oscillator();
  let wave1 = 'square';
  let amp1 = 0.5;
  let osc1Enabled = true;

  // Oscillator 2
  const osc2 = new p5.Oscillator();
  let wave2 = 'square';
  let amp2 = 0.5;
  let osc2Enabled = true;
  let osc2Octave = 0;
  let osc2Offset = 0;

  // Oscillator 3
  const osc3 = new p5.Oscillator();
  let wave3 = 'square';
  let amp3 = 0.5;
  let osc3Enabled = true;
  let osc3Octave = 0;
  let osc3Offset = 0;

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

    //draw notes
    push();
    stroke(255);
    strokeWeight(2);
    for (i = 0; i < 6; i++) {
      line (this.x, ((this.y / 2) + i * 25), width - 20, ((this.y / 2) + i * 25))
    }
    image(img, 250, 300, 200, 200);
    fill(255);
    textSize(50);
    text(note, 800, 250);
    pop();
  };
  
  this.mousePressed = function() {
    // check if mouse press is within keyboard
    if(mouseY > this.y && mouseY < this.y + keyHeight) {

      // check if black key pressed
      for(i = 0; i < blackKeys.length; i++) {
        if( mouseX > ((this.x + (blackKeys[i].position * 2) * keyWidthSmall) + (keyWidthSmall/2)) 
            && mouseX < (((this.x + (blackKeys[i].position * 2) * keyWidthSmall) + (keyWidthSmall/2)) + keyWidthSmall)
            && mouseY > this.y
            && mouseY < (this.y + keyHeightSmall)){
              this.playNote(blackKeys[i].freq);
              note = blackKeys[i].note;
              return
        }
      }

      // check if white key pressed
      for(i = 0; i < whiteKeys.length; i++) {
        if( mouseX > (this.x + whiteKeys[i].position * keyWidth) 
            && mouseX < ((this.x + whiteKeys[i].position * keyWidth) + keyWidth)){
              this.playNote(whiteKeys[i].freq);
              note = whiteKeys[i].note;
              return
        }
      }
    }
  };

  this.playNote = function(frequency) {
    // play first oscillator
    if (osc1Enabled) {
      osc1.start();
      osc1.setType(wave1);
      osc1.amp(amp1);
      console.log('osc1:', frequency);
      osc1.freq(frequency);
    }

    // play second oscillator
    if (osc2Enabled) {
      let playfrequency = adjustFrequency((adjustOctave(frequency, osc2Octave)), osc2Offset);
      osc2.start()
      osc2.setType(wave2);
      osc2.amp(amp2);
      console.log('osc2:', playfrequency);
      osc2.freq(playfrequency);
    }

    //play third oscillator
    if (osc3Enabled) {
      let playfrequency = adjustFrequency((adjustOctave(frequency, osc3Octave)), osc3Offset);
      osc3.start()
      osc3.setType(wave3);
      osc3.amp(amp3);
      console.log('osc3:', playfrequency);
      osc3.freq(playfrequency);
    }
  }

  let adjustOctave = function(frequency, octave) {
    if (octave == 0) {
      return frequency
    }
    else {
      return ( octave > 0 ? (frequency * (2 * octave)) : (frequency / (2 * abs(octave))));
    }
  }

  let adjustFrequency = function(frequency, offset) {
    let twelfthRootOfTwo = Math.pow(2, 1/12);
    if (offset == 0) {
      return frequency;
    }
    else {
      return ( offset > 0 ? (frequency * (offset * twelfthRootOfTwo)) : (frequency / (abs(offset) * twelfthRootOfTwo)));
    }
  }

  this.mouseReleased = function() {
    osc1.stop();
    if (osc2Enabled) {
      osc2.stop();
    }
    if (osc3Enabled) {
      osc3.stop();
    }
    note = '';
  }

  this.reset = function() {
		
	}
}