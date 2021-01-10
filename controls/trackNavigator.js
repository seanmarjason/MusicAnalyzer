// Displays the length of the track, current playback point, 
// and handles ability to navigate track
function TrackNavigator(){

  this.start = 400;
  this.end = width - 100
  this.y = 30;

  var trackDuration;
  var trackElapsed = 0;
  var trackRemaining;
  var trackPosition = this.start;

  this.updateTrackPosition = function(currentSoundDuration, currentSoundTime) {
    trackDuration = currentSoundDuration;
    trackElapsed = currentSoundTime;
    trackRemaining = trackDuration - trackElapsed;
    trackPosition = map(trackElapsed, 0, trackDuration, this.start, this.end)
  }

  this.draw = function() {

    // Track Line - time remaining
    push();
    stroke(100);
    strokeWeight(2);
    line(trackPosition, this.y, this.end, this.y);
    pop();

    // Track Line - time elapsed
    push();
    stroke(255);
    strokeWeight(4);
    line(this.start, this.y, trackPosition, this.y);
    pop();

    // Track Lines - start and end
    push();
    stroke(255);
    strokeWeight(4);
    line(this.start, this.y - 5, this.start, this.y + 5)
    line(this.end, this.y - 5, this.end, this.y + 5)
    pop();

    // Draw track ellapsed time and duration
    push();
    fill("white");
		stroke("black");
    strokeWeight(1);
    textSize(14);
    text(convertSecondsToMinutes(trackElapsed), this.start, this.y + 25);
    textAlign(RIGHT);
    text(("-" + convertSecondsToMinutes(trackRemaining)), this.end, this.y + 25)
    pop();

    // Draw track marker
    push();
    stroke(0);
    strokeWeight(2);
    fill(255)
    rect(trackPosition - 4, this.y - 10, 8, 20);
    pop();
  }

  // convert seconds to minutes and seconds
  var convertSecondsToMinutes = function(seconds) {
    var elapsedMinutes = (Math.floor(seconds / 60)).toFixed();
    var elapsedSeconds = (seconds % 60).toFixed();
    return  (elapsedSeconds < 10 ? 
            (elapsedMinutes + '.0' + elapsedSeconds) 
            : (elapsedMinutes + '.' + elapsedSeconds));
  }

  this.hitCheck = function() {
    if(	mouseX > this.start && mouseX < this.end
      && mouseY > this.y - 10	&& mouseY < this.y + 10) {
        return true;
    }
  }

  // jump to another position in track on click
  this.jumpTrack = function(position) {
      var jumpPosition = map(position, this.start, this.end, 0, trackDuration);
      return jumpPosition;
  }

  // resize trackNavigator on window resize
  this.onResize = function() {
    this.end = width - 100;
	};
}