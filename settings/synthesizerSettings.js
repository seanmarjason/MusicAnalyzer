
function SynthesizerSettings() {
  this.name = "Synthesizer Settings"

  // Oscillator 1
  let oscillator1Settings;
  let enabled1;
  let amp1;
  let wave1;
  let octave1;
  let offset1;
  let attack1;
  let decay1;
  let sustain1;
  let release1;

  // Oscillator 2
  let oscillator2Settings;
  let enabled2;
  let amp2;
  let wave2;
  let octave2;
  let offset2;
  let attack2;
  let decay2;
  let sustain2;
  let release2;

  // Oscillator 3
  let oscillator3Settings;
  let enabled3;
  let amp3;
  let wave3;
  let octave3;
  let offset3;
  let attack3;
  let decay3;
  let sustain3;
  let release3;

  let settings = [];
  let settingsPos = {};
  let oscillatorCount

  const waveOptions = ['sine', 'triangle', 'square', 'sawtooth'];
  const octaveOptions = [-2, -1, 0, 1, 2];
  const offsetOptions = [-2, -1, 0, 1, 2];

  this.onResize = function() {
    oscillator1Settings = {x: (width/2) - (width/3), y: 200}
    oscillator2Settings = {x: (width/2) - 50, y: 200}
    oscillator3Settings = {x: (width/2) + (width/3) - 100, y: 200}
  }
  this.onResize();

  this.open = function() {

    oscillatorCount = Object.keys(vis.selectedVisual.oscillators).length;

    // set the position of each oscillator's settings
    let i = 0;
    for (const [oscillator, options] of Object.entries(vis.selectedVisual.oscillators)) {
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

  this.close = function() {
    settings.forEach(setting => setting.remove());
  }
}