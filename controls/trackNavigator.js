// Displays the length of the track, current playback point, 
// and handles ability to navigate track
function TrackNavigator(){

  // set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
  this.onResize = function() {
    this.start = 400;
    this.end = width - 100
    this.y = 30;
    this.end = width - 100;
  };
  this.onResize();

  // set variables to use for drawing navigator
  let trackDuration;
  let trackElapsed = 0;
  let trackRemaining;
  let trackPosition = this.start;

  // method to update the track position while playing or on click
  this.updateTrackPosition = function(currentSoundDuration, currentSoundTime) {
    trackDuration = currentSoundDuration;
    trackElapsed = currentSoundTime;
    trackRemaining = trackDuration - trackElapsed;
    trackPosition = map(trackElapsed, 0, trackDuration, this.start, this.end)
  }


  this.draw = function() {

    // Track Line for time remaining (current time to end of track)
    push();
    stroke(100);
    strokeWeight(2);
    line(trackPosition, this.y, this.end, this.y);
    pop();

    // Track Line for time elapsed (start time to current time)
    push();
    stroke(255);
    strokeWeight(4);
    line(this.start, this.y, trackPosition, this.y);
    pop();

    // Track Lines - start and end dashes
    push();
    stroke(255);
    strokeWeight(4);
    line(this.start, this.y - 5, this.start, this.y + 5)
    line(this.end, this.y - 5, this.end, this.y + 5)
    pop();

    // Draw track ellapsed and remaining times
    push();
    fill("white");
		stroke("black");
    strokeWeight(1);
    textSize(14);
    text(convertSecondsToMinutes(trackElapsed), this.start, this.y + 25);
    textAlign(RIGHT);
    text(("-" + convertSecondsToMinutes(trackRemaining)), this.end, this.y + 25)
    pop();

    // Draw track marker at urrent time
    push();
    stroke(0);
    strokeWeight(2);
    fill(255)
    rect(trackPosition - 4, this.y - 10, 8, 20); // rect marker at width of 8 (track position +/- 4 pixels)
    pop();
  }

  // private method to convert seconds to minutes and seconds for display to user
  const convertSecondsToMinutes = function(seconds) {
    const elapsedMinutes = (Math.floor(seconds / 60)).toFixed();
    const elapsedSeconds = (seconds % 60).toFixed();
    return  (elapsedSeconds < 10 ? 
            (elapsedMinutes + '.0' + elapsedSeconds) 
            : (elapsedMinutes + '.' + elapsedSeconds));
  }

  // public method for checking if user jumps through track using navigator
  this.hitCheck = function() {
    if(	mouseX > this.start && mouseX < this.end
      && mouseY > this.y - 10	&& mouseY < this.y + 10) {
        return true;
    }
  }

  // public method to jump to another position in track on click
  this.jumpTrack = function(position) {
      const jumpPosition = map(position, this.start, this.end, 0, trackDuration);
      return jumpPosition;
  }


}