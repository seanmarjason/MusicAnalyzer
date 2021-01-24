
function SynthesizerSettings() {
  this.name = "Synthesizer Settings"

  // Oscillator 1
  var oscillator1Settings = {x: 50, y: 200}
  var enabled1;
  var amp1;
  var wave1;
  var octave1;
  var offset1;

  // Oscillator 2
  var enabled2;
  var amp2;
  var wave2;
  var octave2;
  var offset2;

  // Oscillator 3
  var enabled3;
  var amp3;
  var wave3;
  var octave3;
  var offset3;

  this.open = function() {

    // OSCILLATOR 1
    // Enabled
    enabled1 = createCheckbox('', vis.selectedVisual.oscillators[0].enabled);
    enabled1.position(oscillator1Settings.x + 75, oscillator1Settings.y + 35);
    enabled1.changed(() => vis.selectedVisual.oscillators[0].enabled = !vis.selectedVisual.oscillators[0].enabled);

    // Amplitude
    amp1 = createSlider(0, 1, vis.selectedVisual.oscillators[0].amplitude, 0.05);
    amp1.position(oscillator1Settings.x, oscillator1Settings.y + 125)
    amp1.changed(() => vis.selectedVisual.oscillators[0].amplitude = amp1.value());

    // Wave
    wave1 = createSelect();
    wave1.position(oscillator1Settings.x + 75, oscillator1Settings.y + 175);
    ['sine', 'triangle', 'square', 'sawtooth'].forEach(item => wave1.option(item));
    wave1.value(vis.selectedVisual.oscillators[0].wave);
    wave1.changed(() => vis.selectedVisual.oscillators[0].wave = wave1.value());

    // Octave
    octave1 = createSelect();
    octave1.position(oscillator1Settings.x + 75, oscillator1Settings.y + 225);
    [-2, -1, 0, 1, 2].forEach(item => octave1.option(item));
    octave1.value(vis.selectedVisual.oscillators[0].octave);
    octave1.changed(() => vis.selectedVisual.oscillators[0].octave = octave1.value());

    // Tone
    offset1 = createSelect();
    offset1.position(oscillator1Settings.x + 75, oscillator1Settings.y + 275);
    [-2, -1, 0, 1, 2].forEach(item => offset1.option(item));
    offset1.value(vis.selectedVisual.oscillators[0].offset);
    offset1.changed(() => vis.selectedVisual.oscillators[0].offset = offset1.value());

  }

  this.draw = function() {
    fill(255);
    textSize(18);
    rect(0, 75, width, height / 2);
    fill(0);
    text(this.name, width / 2, 100);

    text('Oscillator 1', oscillator1Settings.x, oscillator1Settings.y)
    text('Enabled:', oscillator1Settings.x, oscillator1Settings.y + 50)
    text('Amplitude: ' + vis.selectedVisual.oscillators[0].amplitude, oscillator1Settings.x, oscillator1Settings.y + 100)
    text('Wave: ', oscillator1Settings.x, oscillator1Settings.y + 190)
    text('Octave: ', oscillator1Settings.x, oscillator1Settings.y + 240)
    text('Offset: ', oscillator1Settings.x, oscillator1Settings.y + 290)

  }

  this.close = function() {
    enabled1.remove();
    amp1.remove();
    wave1.remove();
    octave1.remove();
    offset1.remove();
  }
}