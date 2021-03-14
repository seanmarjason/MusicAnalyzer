// Constructor to create user customisable settings for clipping visualiser
// @param name: Title to be used for settings pane
// @method onResize: set size values in resize function to enable responsiveness
// @method open: create settings elements on opening settings pane
// @method draw: create labels for settings
// @method close: remove settings elements on closing settings pane
function SynthesizerSettings() {
  this.name = "Synthesizer Settings"

  let settings = [];
  let settingsPos = {}; //store location parameters

  let oscillatorCount;

  const waveOptions = ['sine', 'triangle', 'square', 'sawtooth'];
  const octaveOptions = [-2, -1, 0, 1, 2];
  const offsetOptions = [-2, -1, 0, 1, 2];

  // set settings location
  this.onResize = function() {
  }

  // create DOM elements only on open
  // avoids multiple elements created in draw loop
  this.open = function() {

    oscillatorCount = Object.keys(vis.selectedVisual.oscillators).length;

    // set the position of each oscillator's settings
    let i = 0;
    for (const [oscillator] of Object.entries(vis.selectedVisual.oscillators)) {
      settingsPos[oscillator] = { x: (width / oscillatorCount) * i + 75,
                                  y: 200
                                }
      i++
    }

    // Create DOM elements for each setting for each oscillator
    for (const [oscillator] of Object.entries(vis.selectedVisual.oscillators)) {

      // Enabled
      let enabled = new Checkbox ( settingsPos[oscillator].x + 75, settingsPos[oscillator].y + 35,
                                   vis.selectedVisual.oscillators[oscillator].enabled,
                                   () => vis.selectedVisual.toggleOscillator(oscillator)
                                  );

      // Amplitude
      let amplitude = new Slider( settingsPos[oscillator].x, settingsPos[oscillator].y + 125,
                                  0, 1, 0.05, vis.selectedVisual.oscillators[oscillator].amplitude,
                                  () => vis.selectedVisual.setOscillatorParameter(oscillator, 'amplitude', amplitude.value)
                                );

      // Wave
      let wave = new Select(  settingsPos[oscillator].x + 65, settingsPos[oscillator].y + 175,
                              waveOptions,
                              vis.selectedVisual.oscillators[oscillator].wave,
                              () => vis.selectedVisual.setOscillatorParameter(oscillator, 'wave', wave.value),
                            );

      // Octave
      let octave = new Select(  settingsPos[oscillator].x + 65, settingsPos[oscillator].y + 225,
                                octaveOptions,
                                vis.selectedVisual.oscillators[oscillator].octave,
                                () => vis.selectedVisual.setOscillatorParameter(oscillator, 'octave', octave.value)
                              );

      // Offset
      let offset = new Select( settingsPos[oscillator].x + 65, settingsPos[oscillator].y + 275,
                                offsetOptions,
                                vis.selectedVisual.oscillators[oscillator].offset,
                                () => vis.selectedVisual.setOscillatorParameter(oscillator, 'offset', offset.value)
                              );
      
      // Envelope
      const envelopePos = {x: settingsPos[oscillator].x - 60, y: settingsPos[oscillator].y + 420}

      let attack = new Slider(  envelopePos.x, envelopePos.y,
                                0, 1, 0.05, vis.selectedVisual.oscillators[oscillator].envelope.attack,
                                () => vis.selectedVisual.setOscillatorEnvelope(oscillator, 'attack', attack.value),
                                'verticle'
                              );

      let decay = new Slider( envelopePos.x + 30, envelopePos.y,
                              0, 1, 0.05, vis.selectedVisual.oscillators[oscillator].envelope.decay,
                              () => vis.selectedVisual.setOscillatorEnvelope(oscillator, 'decay', decay.value),
                              'verticle'
                            );

      let sustain = new Slider( envelopePos.x + 60, envelopePos.y, 
                                0, 1, 0.05, vis.selectedVisual.oscillators[oscillator].envelope.sustain,
                                () => vis.selectedVisual.setOscillatorEnvelope(oscillator, 'sustain', sustain.value),
                                'verticle'
                              );

      let release = new Slider(  envelopePos.x + 90, envelopePos.y,
                                  0, 5, 0.1, vis.selectedVisual.oscillators[oscillator].envelope.release,
                                  () => vis.selectedVisual.setOscillatorEnvelope(oscillator, 'release', release.value),
                                  'verticle'
                                );

      settings.push(enabled, amplitude, wave, octave, offset, attack, decay, sustain, release);
    }
  }

  // Draw labels for settings
  this.draw = function() {
    text(this.name, width / 2, 100);

    for (const [oscillator, settings] of Object.entries(vis.selectedVisual.oscillators)) {
      text('Oscillator ' + (settings.ref+1), settingsPos[oscillator].x, settingsPos[oscillator].y);
      text('Enabled:', settingsPos[oscillator].x, settingsPos[oscillator].y + 50);
      text('Amplitude: ' + vis.selectedVisual.oscillators[oscillator].amplitude, settingsPos[oscillator].x, settingsPos[oscillator].y + 100);
      text('Wave: ', settingsPos[oscillator].x, settingsPos[oscillator].y + 190);
      text('Octave: ', settingsPos[oscillator].x, settingsPos[oscillator].y + 240);
      text('Offset: ', settingsPos[oscillator].x, settingsPos[oscillator].y + 290);
      text('A', settingsPos[oscillator].x, settingsPos[oscillator].y + 510)
      text('D', settingsPos[oscillator].x + 30, settingsPos[oscillator].y + 510)
      text('S', settingsPos[oscillator].x + 60, settingsPos[oscillator].y + 510)
      text('R', settingsPos[oscillator].x + 90, settingsPos[oscillator].y + 510)
    }
  }

  // remove DOM elements on close
  // ensures elements do not overlap with current canvas
  this.close = function() {
    settings.forEach(setting => setting.remove());
  }
}