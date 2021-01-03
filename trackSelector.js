// Displays and handles menu to select a music track to analyse and visualise
function TrackSelector(){

  // set up mapping between selector label and path to audio file
  let tracks = {
    'Default': 'assets/stomper_reggae_bit.mp3',
    'Ed Sheeran - Castle On The Hill': 'assets/EdSheeran_CastleOnTheHill.mp3',
    'Rudimental - These Days': 'assets/Rudimental_TheseDays.mp3',
    'Rufus - Treat You Better': 'assets/RufusDuSol_TreatYouBetter.mp3',
    'Stormzy - Rainfall': 'assets/Stormzy_Rainfall.mp3',
    'Swedish House Mafia - Save The World': 'assets/SwedishHouseMafia_SaveTheWorld.mp3',
  }

  this.x = 60;
  this.y = 20;

  let sel;
  sel = createSelect();
  sel.position(this.x, this.y);
  sel.option('Default');
  sel.option('Ed Sheeran - Castle On The Hill');
  sel.option('Rudimental - These Days');
  sel.option('Rufus - Treat You Better');
  sel.option('Stormzy - Rainfall');
  sel.option('Swedish House Mafia - Save The World');

  sel.changed(function() {
    controls.playbackButton.enabled = false;
    if(sound.isPlaying()) {
      sound.pause();
      controls.playbackButton.playing = false;
    }
    sound = loadSound(tracks[sel.value()], soundLoaded);
  });

  // stub function for callback upon successful loading of new audio file
  let soundLoaded = function(){
    controls.playbackButton.enabled = true;
  }
}