
function SynthesizerSettings() {
  this.name = "Synthesizer Settings"

  // Oscillator 1
  var oscillator1Settings;
  var enabled1;
  var amp1;
  var wave1;
  var octave1;
  var offset1;
  var attack1;
  var decay1;
  var sustain1;
  var release1;

  // Oscillator 2
  var oscillator2Settings;
  var enabled2;
  var amp2;
  var wave2;
  var octave2;
  var offset2;
  var attack2;
  var decay2;
  var sustain2;
  var release2;

  // Oscillator 3
  var oscillator3Settings;
  var enabled3;
  var amp3;
  var wave3;
  var octave3;
  var offset3;

  var waveOptions = ['sine', 'triangle', 'square', 'sawtooth'];
  var octaveOptions = [-2, -1, 0, 1, 2];
  var offsetOptions = [-2, -1, 0, 1, 2];

  this.onResize = function() {
    oscillator1Settings = {x: (width/2) - (width/3), y: 200}
    oscillator2Settings = {x: (width/2) - 50, y: 200}
    oscillator3Settings = {x: (width/2) + (width/3) - 100, y: 200}
  }
  this.onResize();

  this.open = function() {

    // OSCILLATOR 1
    // Enabled
    enabled1 = createCheckbox('', vis.selectedVisual.oscillators['oscillator1'].enabled);
    enabled1.position(oscillator1Settings.x + 75, oscillator1Settings.y + 35);
    enabled1.changed(() => vis.selectedVisual.toggleOscillator('oscillator1'));

    // Amplitude
    amp1 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator1'].amplitude, 0.05);
    amp1.position(oscillator1Settings.x, oscillator1Settings.y + 125)
    amp1.changed(() => vis.selectedVisual.setOscillatorParameter('oscillator1', 'amplitude', amp1.value()));

    // Wave
    wave1 = new Select( oscillator1Settings.x + 75, 
                        oscillator1Settings.y + 175,
                        waveOptions,
                        vis.selectedVisual.oscillators['oscillator1'].wave,
                        () => vis.selectedVisual.setOscillatorParameter('oscillator1', 'wave', wave1.value),
                      );


    // Octave
    octave1 = new Select( oscillator1Settings.x + 75,
                          oscillator1Settings.y + 225,
                          octaveOptions,
                          vis.selectedVisual.oscillators['oscillator1'].octave,
                          () => vis.selectedVisual.setOscillatorParameter('oscillator1', 'octave', octave1.value)
                        );


    // Tone
    offset1 = new Select( oscillator1Settings.x + 75,
                          oscillator1Settings.y + 275,
                          offsetOptions,
                          vis.selectedVisual.oscillators['oscillator1'].offset,
                          () => vis.selectedVisual.setOscillatorParameter('oscillator1', 'offset', offset1.value)
                        );


    // Envelope
    attack1 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator1'].envelope.attack, 0.05);
    attack1.style('transform', 'rotate(270deg)');
    attack1.position(oscillator1Settings.x - 60, oscillator1Settings.y + 420);
    attack1.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator1', 'attack', attack1.value()));
    
    decay1 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator1'].envelope.decay, 0.05);
    decay1.style('transform', 'rotate(270deg)');
    decay1.position(oscillator1Settings.x - 30, oscillator1Settings.y + 420);
    decay1.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator1', 'decay', decay1.value()));
    
    sustain1 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator1'].envelope.sustain, 0.05);
    sustain1.style('transform', 'rotate(270deg)');
    sustain1.position(oscillator1Settings.x, oscillator1Settings.y + 420);
    sustain1.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator1', 'decay', sustain1.value()));
    
    release1 = createSlider(0, 5, vis.selectedVisual.oscillators['oscillator1'].envelope.release, 0.1);
    release1.style('transform', 'rotate(270deg)');
    release1.position(oscillator1Settings.x + 30, oscillator1Settings.y + 420);
    release1.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator1', 'release', release1.value()));

    // OSCILLATOR 2
    // Enabled
    enabled2 = createCheckbox('', vis.selectedVisual.oscillators['oscillator2'].enabled);
    enabled2.position(oscillator2Settings.x + 75, oscillator2Settings.y + 35);
    enabled2.changed(() => vis.selectedVisual.toggleOscillator('oscillator2'));

    // Amplitude
    amp2 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator2'].amplitude, 0.05);
    amp2.position(oscillator2Settings.x, oscillator2Settings.y + 125)
    amp2.changed(() => vis.selectedVisual.setOscillatorParameter('oscillator2', 'amplitude',  amp2.value()));

    // Wave
    wave2 = new Select( oscillator2Settings.x + 75,
                        oscillator2Settings.y + 175,
                        waveOptions,
                        vis.selectedVisual.oscillators['oscillator2'].wave,
                        () => vis.selectedVisual.setOscillatorParameter('oscillator2', 'wave', wave2.value)
                      );

    // Octave
    octave2 = new Select( oscillator2Settings.x + 75,
                          oscillator2Settings.y + 225,
                          octaveOptions,
                          vis.selectedVisual.oscillators['oscillator2'].octave,
                          () => vis.selectedVisual.setOscillatorParameter('oscillator2', 'octave', octave2.value)
                        );


    // Tone
    offset2 = new Select( oscillator2Settings.x + 75, 
                          oscillator2Settings.y + 275,
                          offsetOptions,
                          vis.selectedVisual.oscillators['oscillator2'].offset,
                          () => vis.selectedVisual.setOscillatorParameter('oscillator2', 'offset', offset2.value)
                        );


    // Envelope
    attack2 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator2'].envelope.attack, 0.05);
    attack2.style('transform', 'rotate(270deg)');
    attack2.position(oscillator2Settings.x - 60, oscillator2Settings.y + 420);
    attack2.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator2', 'attack', attack2.value()));
    
    decay2 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator2'].envelope.decay, 0.05);
    decay2.style('transform', 'rotate(270deg)');
    decay2.position(oscillator2Settings.x - 30, oscillator2Settings.y + 420);
    decay2.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator2', 'decay', decay2.value()));
    
    sustain2 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator2'].envelope.sustain, 0.05);
    sustain2.style('transform', 'rotate(270deg)');
    sustain2.position(oscillator2Settings.x, oscillator2Settings.y + 420);
    sustain2.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator2', 'sustain', sustain2.value()));
    
    release2 = createSlider(0, 5, vis.selectedVisual.oscillators['oscillator2'].envelope.release, 0.1);
    release2.style('transform', 'rotate(270deg)');
    release2.position(oscillator2Settings.x + 30, oscillator2Settings.y + 420);
    release2.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator2', 'release', release2.value()));
    

    // OSCILLATOR 3
    // Enabled
    enabled3 = createCheckbox('', vis.selectedVisual.oscillators['oscillator3'].enabled);
    enabled3.position(oscillator3Settings.x + 75, oscillator3Settings.y + 35);
    enabled3.changed(() => vis.selectedVisual.toggleOscillator('oscillator3'));

    // Amplitude
    amp3 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator3'].amplitude, 0.05);
    amp3.position(oscillator3Settings.x, oscillator3Settings.y + 125)
    amp3.changed(() => vis.selectedVisual.setOscillatorParameter('oscillator3', 'amplitude', amp3.value()));

    // Wave
    wave3 = new Select( oscillator3Settings.x + 75, 
                        oscillator3Settings.y + 175,
                        waveOptions,
                        vis.selectedVisual.oscillators['oscillator3'].wave,
                        () => vis.selectedVisual.setOscillatorParameter('oscillator3', 'wave', wave3.value)
                      );


    // Octave
    octave3 = new Select( oscillator3Settings.x + 75, 
                          oscillator3Settings.y + 225,
                          octaveOptions,
                          vis.selectedVisual.oscillators['oscillator3'].octave,
                          () => vis.selectedVisual.setOscillatorParameter('oscillator3', 'octave', octave3.value)
                        );

    // Tone
    offset3 = new Select( oscillator3Settings.x + 75,
                          oscillator3Settings.y + 275,
                          offsetOptions,
                          vis.selectedVisual.oscillators['oscillator3'].offset,
                          () => vis.selectedVisual.setOscillatorParameter('oscillator3', 'offset', offset3.value)
                        );


    // Envelope
    attack3 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator3'].envelope.attack, 0.05);
    attack3.style('transform', 'rotate(270deg)');
    attack3.position(oscillator3Settings.x - 60, oscillator3Settings.y + 420);
    attack3.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator3', 'attack', attack3.value()));
    
    decay3 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator3'].envelope.decay, 0.05);
    decay3.style('transform', 'rotate(270deg)');
    decay3.position(oscillator3Settings.x - 30, oscillator3Settings.y + 420);
    decay3.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator3', 'decay', decay3.value()));
    
    sustain3 = createSlider(0, 1, vis.selectedVisual.oscillators['oscillator3'].envelope.sustain, 0.05);
    sustain3.style('transform', 'rotate(270deg)');
    sustain3.position(oscillator3Settings.x, oscillator3Settings.y + 420);
    sustain3.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator3', 'sustain', sustain3.value()));
    
    release3 = createSlider(0, 5, vis.selectedVisual.oscillators['oscillator3'].envelope.release, 0.1);
    release3.style('transform', 'rotate(270deg)');
    release3.position(oscillator3Settings.x + 30, oscillator3Settings.y + 420);
    release3.changed(() => vis.selectedVisual.setOscillatorEnvelope('oscillator3', 'release', release3.value()));
    
  }

  this.draw = function() {
    text(this.name, width / 2, 100);

    text('Oscillator 1', oscillator1Settings.x, oscillator1Settings.y)
    text('Enabled:', oscillator1Settings.x, oscillator1Settings.y + 50)
    text('Amplitude: ' + vis.selectedVisual.oscillators['oscillator1'].amplitude, oscillator1Settings.x, oscillator1Settings.y + 100)
    text('Wave: ', oscillator1Settings.x, oscillator1Settings.y + 190)
    text('Octave: ', oscillator1Settings.x, oscillator1Settings.y + 240)
    text('Offset: ', oscillator1Settings.x, oscillator1Settings.y + 290)
    text('Envelope: ', oscillator1Settings.x, oscillator1Settings.y + 350)
    text('A', oscillator1Settings.x, oscillator1Settings.y + 510)
    text('D', oscillator1Settings.x + 30, oscillator1Settings.y + 510)
    text('S', oscillator1Settings.x + 60, oscillator1Settings.y + 510)
    text('R', oscillator1Settings.x + 90, oscillator1Settings.y + 510)


    text('Oscillator 2', oscillator2Settings.x, oscillator2Settings.y)
    text('Enabled:', oscillator2Settings.x, oscillator2Settings.y + 50)
    text('Amplitude: ' + vis.selectedVisual.oscillators['oscillator2'].amplitude, oscillator2Settings.x, oscillator2Settings.y + 100)
    text('Wave: ', oscillator2Settings.x, oscillator2Settings.y + 190)
    text('Octave: ', oscillator2Settings.x, oscillator2Settings.y + 240)
    text('Offset: ', oscillator2Settings.x, oscillator2Settings.y + 290)
    text('Envelope: ', oscillator2Settings.x, oscillator2Settings.y + 350)
    text('A', oscillator2Settings.x, oscillator2Settings.y + 510)
    text('D', oscillator2Settings.x + 30, oscillator2Settings.y + 510)
    text('S', oscillator2Settings.x + 60, oscillator2Settings.y + 510)
    text('R', oscillator2Settings.x + 90, oscillator2Settings.y + 510)

    text('Oscillator 3', oscillator3Settings.x, oscillator3Settings.y)
    text('Enabled:', oscillator3Settings.x, oscillator3Settings.y + 50)
    text('Amplitude: ' + vis.selectedVisual.oscillators['oscillator3'].amplitude, oscillator3Settings.x, oscillator3Settings.y + 100)
    text('Wave: ', oscillator3Settings.x, oscillator3Settings.y + 190)
    text('Octave: ', oscillator3Settings.x, oscillator3Settings.y + 240)
    text('Offset: ', oscillator3Settings.x, oscillator3Settings.y + 290)
    text('Envelope: ', oscillator3Settings.x, oscillator3Settings.y + 350)
    text('A', oscillator3Settings.x, oscillator3Settings.y + 510)
    text('D', oscillator3Settings.x + 30, oscillator3Settings.y + 510)
    text('S', oscillator3Settings.x + 60, oscillator3Settings.y + 510)
    text('R', oscillator3Settings.x + 90, oscillator3Settings.y + 510)

  }

  this.close = function() {
    enabled1.remove();
    amp1.remove();
    wave1.remove();
    octave1.remove();
    offset1.remove();
    attack1.remove();
    decay1.remove();
    sustain1.remove();
    release1.remove();

    enabled2.remove();
    amp2.remove();
    wave2.remove();
    octave2.remove();
    offset2.remove();
    attack2.remove();
    decay2.remove();
    sustain2.remove();
    release2.remove();

    enabled3.remove();
    amp3.remove();
    wave3.remove();
    octave3.remove();
    offset3.remove();
    attack3.remove();
    decay3.remove();
    sustain3.remove();
    release3.remove();
  }
}