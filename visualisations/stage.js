//draw the waveform to the screen
function Stage() {
	//vis name
  this.name = "Stage Visualiser";
  
  let stageHeight = height / 4 * 3;
  let stageDepth = height / 4

  let deskHeight = 250;
  let deskWidth = width / 4 * 2;

  let speakerHeight = 400;
  let speakerWidth = 100;

  let stageLights = 5;
  let stageLightInterval = width / stageLights;

  let featureLights = 5;
  let featureLightInterval = deskWidth / featureLights;

  const stageFourier = new p5.FFT();
  const amplitude = new p5.Amplitude();
  amplitude.smooth(0.9);

	//draw the stage to the screen
	this.draw = function() {
		var energy = stageFourier.analyze();

    // draw stage background
    push();
    fill(10, 10, 10);
    rect(0, stageHeight, width, stageDepth); //stage
    rect(0, 0, width, height / 5); //light assembley
    pop();

    // draw stage lights
    push();
    fill(255, 255, 255);
    noStroke();
    let stageLightSize = map(stageFourier.getEnergy('treble'), 0, 255, 10, 100);
    for(i = 0; i < stageLights; i++) {
      circle((stageLightInterval * i) + (stageLightInterval / 2), height / 5, stageLightSize);
    }
    pop();

    // draw kit
    push();
    fill(20, 20, 20);
    rect(width / 4, stageHeight - deskHeight + (deskHeight / 2), deskWidth, deskHeight); //desk
    rect(width / 8, stageHeight - speakerHeight + (speakerHeight / 2), speakerWidth, speakerHeight); //speaker set 1
    rect(width / 8 * 7 - speakerWidth, stageHeight - speakerHeight + (speakerHeight / 2), speakerWidth, speakerHeight); //speaker set 2
    pop();

    // draw feature lights
    push();
    fill(255, 255, 255);
    noStroke();
    let featureLightSize = map(stageFourier.getEnergy('bass'), 0, 255, 10, 100);
    for(i = 0; i < featureLights; i++) {
      circle(width / 4 + (featureLightInterval * i) + (featureLightInterval / 2), stageHeight + (deskHeight / 2), featureLightSize);
    }
    pop();
	};

	this.reset = function() {

	}
}