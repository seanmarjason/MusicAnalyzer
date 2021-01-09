//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){

	const headerHeight = 75;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();
	this.fullscreenButton = new FullscreenButton();
	this.trackSelector = new TrackSelector();
	this.trackNavigator = new TrackNavigator();
	this.menu = new Menu();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		this.playbackButton.hitCheck();
		this.fullscreenButton.hitCheck();
		this.trackNavigator.jumpTrack(mouseX);
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
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
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
		if(this.playbackButton.playing) {
			this.trackNavigator.drawTimeMarker(soundTime);
		}

		// track navigator
		this.trackNavigator.draw();

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
}


