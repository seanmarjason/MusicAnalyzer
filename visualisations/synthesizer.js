//draw the synthesizer to the screen
function Synthesizer() {

  var self = this;

  //vis name
  this.name = "Synthesizer";

  // notes that will be available for user selection
  var notes = [
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

  // keyboard parameters
  var keyboard = {
    x: 0,
    y: 0,
    start: 0,
    whiteKey: {
      width: 50,
      height: 200
    },
    blackKey: {
      width: 25, 
      height: 120
    }
  }

  // separate white and black keys for drawing and hit checks
  var whiteKeys = notes.filter((note) => note.type == 'white');
  var blackKeys = notes.filter((note) => note.type == 'black');

  // set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
  this.resize = function() {
    keyboardX = width / 2;
    keyboardY = height / 4 * 3;
    keyboardStart = keyboardX - (whiteKeys.length * keyboard.whiteKey.width / 2);
  };
  this.resize();

  var currentNote = 'Play Something!';

  // Instantiate Oscillators
  this.oscillators = {
    'oscillator1': 
      {
        osc: new p5.Oscillator(),
        env: new p5.Envelope(),
        ref: 0,
        'wave': 'triangle',
        'amplitude': 0.2,
        'enabled': true,
        'octave': 0,
        'offset': 0,
        'envelope': {
          'attack': 0.05,
          'decay': 0.05,
          'sustain': 0.1,
          'release': 2
        }
      },
    'oscillator2':
      {
        osc: new p5.Oscillator(),
        env: new p5.Envelope(),
        ref: 1,
        'wave': 'sine',
        'amplitude': 0.05,
        'enabled': true,
        'octave': 0,
        'offset': 0,
        'envelope': {
          'attack': 0.05,
          'decay': 0.05,
          'sustain': 0.2,
          'release': 2
        }
      },
    'oscillator3':
      {
        osc: new p5.Oscillator(),
        env: new p5.Envelope(),
        ref: 2,
        'wave': 'triangle',
        'amplitude': 0.05,
        'enabled': true,
        'octave': -1,
        'offset': 0,
        'envelope': {
          'attack': 0.05,
          'decay': 0.05,
          'sustain': 0.2,
          'release': 2
        }
      },
  }

  this.toggleOscillator = function (oscillator) {
    this.oscillators[oscillator].enabled = !this.oscillators[oscillator].enabled;
  }

  this.setOscillatorParameter = function (oscillator, parameter, value) {
    this.oscillators[oscillator][parameter] = value;
  }

  this.setOscillatorEnvelope = function (oscillator, envelopeParameter, value) {
    this.oscillators[oscillator].envelope[envelopeParameter] = value;
  }

	this.draw = function() {

    // draw keyboard to the screen
    push();
    fill(255)
    whiteKeys.forEach(key => { rect( keyboardStart + key.position * keyboard.whiteKey.width,
                                     keyboardY, 
                                     keyboard.whiteKey.width, 
                                     keyboard.whiteKey.height) });
    fill(0)
    blackKeys.forEach(key => { rect( (keyboardStart + (key.position * 2) * keyboard.blackKey.width) + (keyboard.blackKey.width/2),
                                      keyboardY,
                                      keyboard.blackKey.width,
                                      keyboard.blackKey.height) });
    pop();

    // draw oscillator settings to the screen
    push();
    fill(255);
    textSize(16);
    textAlign(CENTER);
    var settingsWidth = (width - 100) / Object.keys(this.oscillators).length;
    var startPosition = (width / 2) - ((settingsWidth * Object.keys(this.oscillators).length) / 2);

    Object.keys(this.oscillators).forEach(function(oscillator) {
      var OS = self.oscillators[oscillator];
      var positionX = startPosition + (OS.ref * settingsWidth) + (settingsWidth / 2);
      var positionY = height / 2
      text('Oscillator ' + (OS.ref+1), positionX, positionY);
      text('Enabled: ' + OS.enabled, positionX, positionY + 50)
      text('Amplitude: ' + OS.amplitude, positionX, positionY + 75)
      text('Wave Type: ' + OS.wave, positionX, positionY + 100)
      text('Octave Offset: ' + OS.octave, positionX, positionY + 125)
      text('Tone Offset: ' + OS.offset, positionX, positionY + 150)
    });
    pop();

    // draw notes
    push();
    stroke(255);
    strokeWeight(2);
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text(currentNote, width / 2, height / 5);
    pop();
  };
  
  this.mousePressed = function() {

    // check if mouse press is within keyboard
    if(mouseY > keyboardY && mouseY < keyboardY + keyboard.whiteKey.height) {

      // check if black key pressed
      for(i = 0; i < blackKeys.length; i++) {
        if( mouseX > ((keyboardStart + (blackKeys[i].position * 2) * keyboard.blackKey.width) + (keyboard.blackKey.width/2)) 
            && mouseX < (((keyboardStart + (blackKeys[i].position * 2) * keyboard.blackKey.width) + (keyboard.blackKey.width/2)) + keyboard.blackKey.width)
            && mouseY > keyboardY
            && mouseY < (keyboardY + keyboard.blackKey.height)){
              this.playNote(blackKeys[i].freq);
              currentNote = blackKeys[i].note;
              return
        }
      }

      // if no black key pressed, check if white key pressed
      for(i = 0; i < whiteKeys.length; i++) {
        if( mouseX > (keyboardStart + whiteKeys[i].position * keyboard.whiteKey.width) 
            && mouseX < ((keyboardStart + whiteKeys[i].position * keyboard.whiteKey.width) + keyboard.whiteKey.width)){
              this.playNote(whiteKeys[i].freq);
              currentNote = whiteKeys[i].note;
              return
        }
      }
    }
  };

  // play the note selected, with harmonies based on oscillator settings
  this.playNote = function(frequency) {
    Object.keys(this.oscillators).forEach(function(oscillator) {
      var OS = self.oscillators[oscillator];
      if (OS.enabled) {
        var playfrequency = adjustFrequency((adjustOctave(frequency, OS.octave)), OS.offset);
        OS.osc.start(); 
        OS.osc.setType(OS.wave);
        OS.osc.amp(OS.amplitude);
        OS.env.setADSR(
          OS.envelope.attack,
          OS.envelope.decay,
          OS.envelope.sustain,
          OS.envelope.release); //set envelope for oscillator
          OS.env.setRange(1,0);
          OS.env.play(OS.osc);
          OS.osc.freq(playfrequency);
      }
    });
  }

  // private function to adjust octave based on oscillator settings to create harmonies (1 unit = 1 octave)
  var adjustOctave = function(frequency, octave) {
    if (octave == 0) {
      return frequency
    }
    else {
      return ( octave > 0 ? (frequency * (2 * octave)) : (frequency / (2 * abs(octave))));
    }
  }

  // private function to adjust frequency based on oscillator settings to create harmonies (1 unit = 1 half-step)
  var adjustFrequency = function(frequency, offset) {
    var twelfthRootOfTwo = Math.pow(2, 1/12);
    if (offset == 0) {
      return frequency;
    }
    else {
      return ( offset > 0 ? (frequency * (offset * twelfthRootOfTwo)) : (frequency / (abs(offset) * twelfthRootOfTwo)));
    }
  }

  // stop oscillators when mouse released
  this.mouseReleased = function() {
    Object.keys(this.oscillators).forEach(function(oscillator) {
      if (self.oscillators[oscillator].enabled) {
        self.oscillators[oscillator].osc.stop();
      }
    });
    currentNote = 'Play Something!';
  }

  this.reset = function() {
		
	}
}