//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	this.menuX = 20;
	this.menuY = 100;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	this.trackSelector = new TrackSelector();

	this.trackNavigator = new TrackNavigator();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		this.playbackButton.hitCheck();
		// if(!this.playbackButton.hitCheck()){
			// var fs = fullscreen();
			// fullscreen(!fs);
		// }
		this.trackNavigator.jumpTrack(mouseX);
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		// console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){
			text("Select a visualisation:", this.menuX, this.menuY);
			this.menu();
		}	

		this.trackNavigator.draw();

		if(this.playbackButton.playing) {
			this.trackNavigator.drawTimeMarker(soundTime);
		}
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = this.menuY + 70 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, this.menuX, yLoc);
		}
	};
}


