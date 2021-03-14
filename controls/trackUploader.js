// Allows upload of a track from the user's file system 
// handled only on client side to prevent track licensing issues
function TrackUploader(){

  // set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
  this.onResize = function() {
    this.x = 150;
    this.y = 45;
    this.width = 200;
    this.height = 20;
  }
  this.onResize();

  push();
  fill(255);

  // create uploader label
  inputLabel = createP('or:');
  inputLabel.position(this.x-30, this.y-14);
  inputLabel.style('color: white; font-family: sans-serif;');

  var fileInput;
  fileInput = createFileInput((tracks) => uploadTracks(tracks), true);
  fileInput.position(this.x, this.y);
  fileInput.size(this.width, this.height);
  fileInput.style('color: white; font-style: italic'); // style the selected file text
  fileInput.attribute('accept', 'audio/*'); // force fileInput to only allow audio files
  pop();

  // Upload tracks to the track selector for use in visualisations
  // @param tracks each track object handled by the file input object
  var uploadTracks = function(tracks) {
    // Add and load track
    controls.trackSelector.addTrack(tracks);
  }
}