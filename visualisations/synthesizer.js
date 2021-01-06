//draw the synthesizer to the screen
function Synthesizer() {

  //vis name
  this.name = "Synthesizer";
  
  this.x = width / 2;
  this.y = height / 4 * 3;

  // keyboard parameters
  let keyWidth = 50;
  let keyWidthSmall = 25
  let keyHeight = 200;
  let keyHeightSmall = 120;
  let note = 'Play Something!';

  const keys = [
    {'note': 'C3', 'freq': 130.8128, 'position': 0, 'type': 'white'},
    {'note': 'C#3', 'freq': 138.5913, 'position': 0.5, 'type': 'black'},
    {'note': 'D3', 'freq': 146.8324, 'position': 1, 'type': 'white'},
    {'note': 'D#3', 'freq': 155.5635, 'position': 1.5, 'type': 'black'},
    {'note': 'E3', 'freq': 164.8138, 'position': 2, 'type': 'white'},
    {'note': 'F3', 'freq': 174.6141, 'position': 3, 'type': 'white'},
    {'note': 'F#3', 'freq': 184.9972, 'position': 3.5, 'type': 'black'},
    {'note': 'G3', 'freq': 195.9977, 'position': 4, 'type': 'white'},
    {'note': 'G#3', 'freq': 207.6523, 'position': 4.5, 'type': 'black'},
    {'note': 'A3', 'freq': 220.0000, 'position': 5, 'type': 'white'},
    {'note': 'A#3', 'freq': 233.0819, 'position': 5.5, 'type': 'black'},
    {'note': 'B3', 'freq': 246.9417, 'position': 6, 'type': 'white'},
    {'note': 'C4', 'freq': 261.6256, 'position': 7, 'type': 'white'},
    {'note': 'C#4', 'freq': 277.1826, 'position': 7.5, 'type': 'black'},
    {'note': 'D4', 'freq': 293.6648, 'position': 8, 'type': 'white'},
    {'note': 'D#4', 'freq': 311.1270, 'position': 8.5, 'type': 'black'},
    {'note': 'E4', 'freq': 329.6276, 'position': 9, 'type': 'white'},
    {'note': 'F4', 'freq': 349.2282, 'position': 10, 'type': 'white'},
    {'note': 'F#4', 'freq': 369.9944, 'position': 10.5, 'type': 'black'},
    {'note': 'G4', 'freq': 391.9954, 'position': 11, 'type': 'white'},
    {'note': 'G#4', 'freq': 415.3047, 'position': 11.5, 'type': 'black'},
    {'note': 'A4', 'freq': 440.0000, 'position': 12, 'type': 'white'},
    {'note': 'A#4', 'freq': 466.1638, 'position': 12.5, 'type': 'black'},
    {'note': 'B4', 'freq': 493.8833, 'position': 13, 'type': 'white'},
    {'note': 'C5', 'freq': 523.2511, 'position': 14, 'type': 'white'},
  ]

  const blackKeys = keys.filter((key) => key.type == 'black');
  const whiteKeys = keys.filter((key) => key.type == 'white');

  let keyboardStartPosition = this.x - (whiteKeys.length * keyWidth / 2);

  // Instantiate Oscillators
  const osc1 = new p5.Oscillator();
  const osc2 = new p5.Oscillator();
  const osc3 = new p5.Oscillator();

  let settings = {
    oscillator1: {
      'wave': 'sine',
      'amplitude': 0.2,
      'enabled': true,
      'octave': 0,
      'offset': 0
    },
    oscillator2: {
      'wave': 'sine',
      'amplitude': 0.05,
      'enabled': true,
      'octave': 0,
      'offset': 0
    },
    oscillator3: {
      'wave': 'sine',
      'amplitude': 0.05,
      'enabled': true,
      'octave': 0,
      'offset': 0
    },
  }


	//draw the synthesizer to the screen
	this.draw = function() {

    push();
    fill(255)
    whiteKeys.forEach(key => { rect(keyboardStartPosition + key.position * keyWidth, this.y, keyWidth, keyHeight) });
    fill(0)
    blackKeys.forEach(key => { rect(  (keyboardStartPosition + (key.position * 2) * keyWidthSmall) + (keyWidthSmall/2),
                                      this.y,
                                      keyWidthSmall,
                                      keyHeightSmall) });
    pop();

    // draw oscillator settings
    push();
    fill(255);
    textSize(16);
    textAlign(CENTER);

    let objectEntries = Object.entries(settings);
    let settingsWidth = 300;
    for(i = 0; i < objectEntries.length; i++) {
      let startPosition = (width / 2 - (settingsWidth * objectEntries.length) / 2) 
      let positionX = (startPosition * (i + 1)) + (settingsWidth / 2);
      let positionY = height / 2
      text('Oscillator ' + (i+1), positionX, positionY);
      text('Enabled: ' + objectEntries[i][1].enabled, positionX, positionY + 50)
      text('Amplitude: ' + objectEntries[i][1].amplitude, positionX, positionY + 75)
      text('Wave Type: ' + objectEntries[i][1].wave, positionX, positionY + 100)
      text('Octave Offset: ' + objectEntries[i][1].octave, positionX, positionY + 125)
      text('Tone Offset: ' + objectEntries[i][1].offset, positionX, positionY + 150)
    }
    pop();

    // draw notes
    push();
    stroke(255);
    strokeWeight(2);
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text(note, width / 2, height / 5);
    pop();
  };
  
  this.mousePressed = function() {

    // check if mouse press is within keyboard
    if(mouseY > this.y && mouseY < this.y + keyHeight) {

      // check if black key pressed
      for(i = 0; i < blackKeys.length; i++) {
        if( mouseX > ((keyboardStartPosition + (blackKeys[i].position * 2) * keyWidthSmall) + (keyWidthSmall/2)) 
            && mouseX < (((keyboardStartPosition + (blackKeys[i].position * 2) * keyWidthSmall) + (keyWidthSmall/2)) + keyWidthSmall)
            && mouseY > this.y
            && mouseY < (this.y + keyHeightSmall)){
              this.playNote(blackKeys[i].freq);
              note = blackKeys[i].note;
              return
        }
      }

      // if no black key pressed, check if white key pressed
      for(i = 0; i < whiteKeys.length; i++) {
        if( mouseX > (keyboardStartPosition + whiteKeys[i].position * keyWidth) 
            && mouseX < ((keyboardStartPosition + whiteKeys[i].position * keyWidth) + keyWidth)){
              this.playNote(whiteKeys[i].freq);
              note = whiteKeys[i].note;
              return
        }
      }
    }
  };

  this.playNote = function(frequency) {
    // play first oscillator
    if (settings.oscillator1.enabled) {
      let playfrequency = adjustFrequency((adjustOctave(frequency, settings.oscillator1.octave)), settings.oscillator1.offset);
      osc1.start();
      osc1.setType(settings.oscillator1.wave);
      osc1.amp(settings.oscillator1.amplitude);
      osc1.freq(playfrequency);
    }

    // play second oscillator
    if (settings.oscillator2.enabled) {
      let playfrequency = adjustFrequency((adjustOctave(frequency, settings.oscillator2.octave)), settings.oscillator2.offset);
      osc2.start();
      osc2.setType(settings.oscillator2.wave);
      osc2.amp(settings.oscillator2.amplitude);
      osc2.freq(playfrequency);
    }

    //play third oscillator
    if (settings.oscillator3.enabled) {
      let playfrequency = adjustFrequency((adjustOctave(frequency, settings.oscillator3.octave)), settings.oscillator3.offset);
      osc3.start();
      osc3.setType(settings.oscillator3.wave);
      osc3.amp(settings.oscillator3.amplitude);
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
    if (settings.oscillator1.enabled) {
      osc1.stop();
    }
    if (settings.oscillator2.enabled) {
      osc2.stop();
    }
    if (settings.oscillator3.enabled) {
      osc3.stop();
    }
    note = 'Play Something!';
  }

  this.reset = function() {
		
	}
}