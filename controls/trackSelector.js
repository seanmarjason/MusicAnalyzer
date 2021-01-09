// Displays and handles menu to select a music track to analyse and visualise
function TrackSelector(){

  // set up mapping between selector label and path to audio file
  tracks = {
    'Default': 'assets/stomper_reggae_bit.mp3',
    'Dubstep': 'assets/bensound-dubstep.mp3',
    'Epic': 'assets/bensound-epic.mp3',
    'Hip Hop': 'assets/bensound-groovyhiphop.mp3',
    'Taiko': 'assets/bensound-instinct.mp3',
    'Ukulele': 'assets/bensound-ukulele.mp3',
  }

  this.onResize = function() {
    this.x = 80;
    this.y = 25;
    this.width = 250;
    this.height = 25;
  }
  this.onResize();

  this.setup = function() {
    let sel;
    sel = createSelect();
    sel.position(this.x, this.y);
    sel.size(this.width, this.height);
    Object.keys(tracks).forEach((item) => sel.option(item));

    sel.changed(function() {
      
      controls.playbackButton.enabled = false;
      if(sound.isPlaying()) {
        sound.pause();
        controls.playbackButton.playing = false;
      }
      sound = loadSound(tracks[sel.value()], soundLoaded);
      vis.selectedVisual.reset();
    });
  }

  this.addTrack = function() {
    // TBD
  }

  // Callback upon successful loading of new audio file
  let soundLoaded = function(){
    controls.playbackButton.enabled = true;
  }
}