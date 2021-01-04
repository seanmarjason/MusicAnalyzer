// Displays the length of the track, current playback point, 
// and handles ability to navigate track
function TrackNavigator(){

  this.start = 400;
  this.end = width - 20
  this.y = 30;
  this.trackCurrentTime = 0;

  let trackDuration;
  let trackElapsed = 0;
  let trackRemaining;
  let trackPosition = this.start;

  this.draw = function() {
    // Reset Track Time Elapsed & Remaining while song is playing
    trackDuration = sound.duration();
    trackElapsed = soundTime;
    trackRemaining = (trackDuration - trackElapsed);
    trackPosition = map(trackElapsed, 0, trackDuration, this.start, this.end);
    
    push();
    textSize(14);

    // Track Lines - start and end
    stroke(255);
    strokeWeight(4);
    line(this.start, this.y - 5, this.start, this.y + 5)
    line(this.end, this.y - 5, this.end, this.y + 5)

    // Track Line - time elapsed
    stroke(255);
    strokeWeight(4);
    line(this.start, this.y, trackPosition, this.y);

    // Track Line - time remaining
    stroke(100);
    strokeWeight(2);
    line(trackPosition, this.y, this.end, this.y);

    // Draw track ellapsed time and duration
    strokeWeight(1);
    text(convertSecondsToMinutes(trackElapsed), this.start, this.y + 25);
    textAlign(RIGHT);
    text(("-" + convertSecondsToMinutes(trackRemaining)), this.end, this.y + 25)
    pop();
  }

  // convert seconds to minutes and seconds
  let convertSecondsToMinutes = function(seconds) {
    let elapsedMinutes = (Math.floor(seconds / 60)).toFixed();
    let elapsedSeconds = (seconds % 60).toFixed();
    return  (elapsedSeconds < 10 ? 
            (elapsedMinutes + '.0' + elapsedSeconds) 
            : (elapsedMinutes + '.' + elapsedSeconds));
  }

  // draw a marker at where the track is currently positioned
  this.drawTimeMarker = function(time) {
    let y = this.y;
    let min = this.start;
    let max = this.end;

    let trackPosition = map(time, 0, trackDuration, min, max)
    
    push();
    stroke(0);
    strokeWeight(2);
    fill(255)
    rect(trackPosition - 4, y - 10, 8, 20);
    pop();
  }

  // jump to another position in track on click
  this.jumpTrack = function(position) {
    if(	mouseX > this.start && mouseX < this.end
      && mouseY > this.y - 10	&& mouseY < this.y + 10) {
        let jumpPosition = map(position, this.start, this.end, 0, trackDuration);
        sound.jump(jumpPosition);
    }
  }

  // resize trackNavigator on window resize
  this.onResize = function() {
    this.end = width - 20;
	};
}