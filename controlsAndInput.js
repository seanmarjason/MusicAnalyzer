//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	this.menuX = 20;
	this.menuY = 120;

	var headerHeight = 75;
	
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

	//draws the playback button and other controls
	this.draw = function(){

		// Header Bar
		push();
		noStroke();
		fill(31, 31, 31);
		rect(0, 0, width, headerHeight);
		pop();

		//playback button 
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		this.playbackButton.draw();

		this.trackNavigator.draw();

		if(this.playbackButton.playing) {
			this.trackNavigator.drawTimeMarker(soundTime);
		}
		pop();

		// only draw the menu if menu displayed is set to true.
		push();
		if(this.menuDisplayed){
			noStroke();
			fill(255);
			rect(0, headerHeight, 400, height - headerHeight - 3);
			fill(33, 33, 33);
			textSize(24);
			text("Select a tool:", this.menuX, this.menuY);
			this.menu();
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


