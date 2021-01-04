// Displays the length of the track, current playback point, 
// and handles ability to navigate track
function TrackNavigator(){

  this.x = 400;
  this.y = 30;
  this.trackCurrentTime = 0;

  this.draw = function() {
    push();
    stroke(255);
    strokeWeight(2);
    textSize(14);

    // Track Line
    line(this.x, this.y, width - 20, this.y);
    line(this.x, this.y - 5, this.x, this.y + 5)
    line(width - 20, this.y - 5, width - 20, this.y + 5)

    // Track Time Elapsed & Remaining
    let trackDuration = sound.duration();
    let trackElapsed = soundTime;
    let trackRemaining = (trackDuration - trackElapsed);

    strokeWeight(1);
    text(convertSecondsToMinutes(trackElapsed), this.x, this.y + 20);
    textAlign(RIGHT);
    text(("-" + convertSecondsToMinutes(trackRemaining)), width - 20, this.y + 20)
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
}