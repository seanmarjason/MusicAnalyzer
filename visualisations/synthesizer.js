// Constructor to display visualisation to trial new additions to a track with sound synthesis
// @param name: Title to be used for menu
// @param oscillators: define number of oscillators and key oscillator settings
// @method resize: set size values in resize function to enable responsiveness
// @method draw: draw visualisation to canvas
// @method toggleOscillator: enable / disable a given oscillator
// @method setOscillatorParameter: amend a key oscillator setting
// @method setOscillatorEnvelope: amend the envelope for a given oscillator
// @method mousePressed: handle user interaction with oscillator (playing a note)
// @method playNote: play a note using enabled oscillators
// @method adjustOctave: adjust the octave of a note being played
// @method adjustFrequency: offset the frequency of a note being played
// @method mouseReleased: handle user ineration with oscillator (releasing a note)
// @method stopNote: stop a note currently being played on oscilators
function Synthesizer() {

  const self = this;

  //vis name
  this.name = "Synthesizer";

  // Instatiate Keyboard
  const keyboard = new Keyboard();

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

  this.resize = function() {
    keyboard.resize();
  }

	this.draw = function() {

    // draw keyboard to the screen
    keyboard.draw();

    // draw oscillator settings to the screen
    push();
    fill(255);
    textSize(16);
    textAlign(CENTER);
    const settingsWidth = (width - 100) / Object.keys(this.oscillators).length;
    const startPosition = (width / 2) - ((settingsWidth * Object.keys(this.oscillators).length) / 2);

    Object.keys(this.oscillators).forEach(function(oscillator) {
      let OS = self.oscillators[oscillator];
      let positionX = startPosition + (OS.ref * settingsWidth) + (settingsWidth / 2);
      let positionY = height / 3
      // show oscillator's settings
      text('Oscillator ' + (OS.ref+1), positionX, positionY);
      text('Enabled: ' + OS.enabled, positionX, positionY + 50)
      text('Amplitude: ' + OS.amplitude, positionX, positionY + 75)
      text('Wave Type: ' + OS.wave, positionX, positionY + 100)
      text('Octave Offset: ' + OS.octave, positionX, positionY + 125)
      text('Tone Offset: ' + OS.offset, positionX, positionY + 150)
      text('Envelope: ', positionX, positionY + 200);
      // draw oscillator's envelope
      push();
      stroke('#FFFFFF');
      strokeWeight(3);
      noFill();
      let envelopePos = {x: positionX - 50, y: positionY + 275}
      beginShape();
      vertex(envelopePos.x, envelopePos.y);
      vertex(envelopePos.x + map(OS.envelope.attack, 0, 1, 0, 40), envelopePos.y - 50); //attack
      vertex( envelopePos.x + map(OS.envelope.attack, 0, 1, 0, 40) + map(OS.envelope.decay, 0, 1, 0, 40), 
              envelopePos.y - map(OS.envelope.sustain, 0, 1, 0, 50)); // decay & sustain
      vertex( envelopePos.x + map(OS.envelope.release, 0, 5, 100, 80),
              envelopePos.y - map(OS.envelope.sustain, 0, 1, 0, 50)); //decay
      vertex(envelopePos.x + 100, envelopePos.y);
      endShape();
      pop();
    });
    pop();

  };

  this.toggleOscillator = function (oscillator) {
    self.oscillators[oscillator].enabled = !self.oscillators[oscillator].enabled;
  }

  this.setOscillatorParameter = function (oscillator, parameter, value) {
    self.oscillators[oscillator][parameter] = value;
  }

  this.setOscillatorEnvelope = function (oscillator, envelopeParameter, value) {
    self.oscillators[oscillator].envelope[envelopeParameter] = value;
  }
  
  this.mousePressed = function() {
    keyboard.mousePressed();
  };

  // play the note selected, with harmonies based on oscillator settings
  this.playNote = function(frequency) {
    Object.keys(this.oscillators).forEach(function(oscillator) {
      let OS = self.oscillators[oscillator];
      if (OS.enabled) {
        let playfrequency = adjustFrequency((adjustOctave(frequency, OS.octave)), OS.offset);
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
  const adjustOctave = function(frequency, octave) {
    if (octave == 0) {
      return frequency
    }
    else {
      return ( octave > 0 ? (frequency * (2 * octave)) : (frequency / (2 * abs(octave))));
    }
  }

  // private function to adjust frequency based on oscillator settings to create harmonies (1 unit = 1 half-step)
  const adjustFrequency = function(frequency, offset) {
    const twelfthRootOfTwo = Math.pow(2, 1/12);
    if (offset == 0) {
      return frequency;
    }
    else {
      return ( offset > 0 ? (frequency * (offset * twelfthRootOfTwo)) : (frequency / (abs(offset) * twelfthRootOfTwo)));
    }
  }

  // stop oscillators when mouse released
  this.mouseReleased = function() {
    keyboard.mouseReleased();
  }

  this.stopNote = function() {
    Object.keys(this.oscillators).forEach(function(oscillator) {
      if (self.oscillators[oscillator].enabled) {
        self.oscillators[oscillator].osc.stop();
      }
    });
  }
}