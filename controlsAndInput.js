//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){

	const headerHeight = 75;

	this.setup = function() {

		// initialise controls
		this.playbackButton = new PlaybackButton();
		this.fullscreenButton = new FullscreenButton();
		this.trackSelector = new TrackSelector();
		this.trackNavigator = new TrackNavigator();
		this.trackUploader = new TrackUploader();
		this.menu = new Menu();
		
		// initialise track selector
		this.trackSelector.setup();

	}

	this.mousePressed = function(){

		// check for clicks on playback button and handle sound play/pause
		if(this.playbackButton.hitCheck()) {
			sound.isPlaying() ? sound.pause() : sound.loop();
		};

		this.fullscreenButton.hitCheck();

		if (this.trackNavigator.hitCheck()) {
			sound.jump(this.trackNavigator.jumpTrack(mouseX));
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){

		// use spacebar to interact with menu
		if(keycode == 32){
			this.menu.displayed = !this.menu.displayed;
		}

		// use number keys to select a visual
		if(keycode > 48 && keycode < 58){
			const visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
			this.menu.displayed = false;
		}
	};

	//draws the playback button and other controls
	this.draw = function(){

		// Header Bar
		push();
		noStroke();
		fill(31, 31, 31);
		rect(0, 0, width, headerHeight);
		pop();

		//playback button 
		this.playbackButton.draw();

		// track navigator
		this.trackNavigator.draw();
		this.trackNavigator.updateTrackPosition(sound.duration(), sound.currentTime());

		// fullscreen button
		this.fullscreenButton.draw();

		// only draw the menu if menu displayed is set to true.
		if(this.menu.displayed){
			this.menu.draw();
		}	
		else{
			push();
			fill(150);
			textSize(12);
			text('Press [space] to open menu', 10, 100);
			pop();
		}
	};

	this.reset = function() {
		if(vis.selectedVisual.reset) {
			vis.selectedVisual.reset();
		}
	}
}


