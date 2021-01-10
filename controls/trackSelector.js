// Displays and handles menu to select a music track to analyse and visualise
function TrackSelector(){

  // set up mapping between selector label and path to audio file
  var tracks = {
    'Default': 'assets/stomper_reggae_bit.mp3',
    'Dubstep': 'assets/bensound-dubstep.mp3',
    'Epic': 'assets/bensound-epic.mp3',
    'Hip Hop': 'assets/bensound-groovyhiphop.mp3',
    'Taiko': 'assets/bensound-instinct.mp3',
    'Ukulele': 'assets/bensound-ukulele.mp3',
  }

  this.loading = false;

  // set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
  this.onResize = function() {
    this.x = 80;
    this.y = 25;
    this.width = 250;
    this.height = 25;
  }
  this.onResize();

  this.setup = function() {

    // create selector element for user to select a track
    var sel;
    sel = createSelect();
    sel.position(this.x, this.y);
    sel.size(this.width, this.height);
    Object.keys(tracks).forEach((item) => sel.option(item));

    // when user changes selection, change track
    sel.changed(function() {
      changeTrack(sel.value());
    });
  }

  // private function to change track on selection
  var changeTrack = function(track) {
    controls.playbackButton.enabled = false;
    if(sound.isPlaying()) {
      sound.pause();
      controls.playbackButton.playing = false;
    }
    sound = loadSound(tracks[track], soundLoaded);
  }

  // private callback upon successful loading of new audio file
  var soundLoaded = function(){
    controls.playbackButton.enabled = true;
    controls.reset();
  }

}