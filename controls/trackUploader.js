// TBC
function TrackUploader(){

  // set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
  this.onResize = function() {
    this.x = 80;
    this.y = 45;
    // this.width = 85;
    this.width = 250;
    this.height = 20;
  }
  this.onResize();

  push();
  fill(255);
  var fileInput;
  fileInput = createFileInput((track) => uploadTrack(track));
  fileInput.type = 'audio'
  fileInput.position(this.x, this.y);
  fileInput.size(this.width, this.height);
  pop();

  this.setup = function() {

    // create selector element for user to select a track
    // var fileInput;
    // fileInput = createFileInput(this.addTrack);
    // fileInput.position(this.x, this.y);
    // fileInput.size(this.width, this.height);

  }

  // TBC
  var uploadTrack = function(track) {
    // Check track is correct file type

    // Add and load track
    controls.trackSelector.addTrack(track);
  }

}