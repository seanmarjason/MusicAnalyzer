//container function for the settings pane
function Settings(){
	//array to store the defined settings panes
	this.settings = [];
	//currently selected settings pane. set to null until settings pane loaded in
  this.selectedSettings = null;
  //boolean to store if settings pane in view
  this.open = false;

	//add a new settings pane to the array
	//@param setting: a settings pane object for a particular visualisation
	this.add = function(setting){
		this.settings.push(setting);
		//if selectedVisual is null set the new visual as the 
		//current visualiation
		if(this.selectedSettings == null){
			this.selectSettings(setting.name);
		}
	};

	//select a settings pane using it name property
	//@param settingsName: name property of the settings pane
	this.selectSettings = function(settingsName){
		for(var i = 0; i < this.settings.length; i++){
			if(settingsName == this.settings[i].name){
				this.selectedSettings = this.settings[i];
			}
		}
  };

  this.keyPressed = function(keycode){

		// use spacebar to interact with menu
		if(keycode == 13){
			!this.open ? this.selectedSettings.open() : this.selectedSettings.close();
			this.open = !this.open
    }

    // use number keys to select a visual
		if(keycode > 48 && keycode < 58){
			this.open && this.selectedSettings.close();
			this.open = false;
			var settingsNumber = keycode - 49;
			this.selectSettings(this.settings[settingsNumber].name); 
		}

	}
	
  this.draw = function() {
    // only draw the settings if settings pane is open.

		if(this.open){
			// draw settings pane
			fill(255, 255, 255, 240);
			textSize(18);
			rect(0, 75, width, height);
			fill(0);
			text(this.name, width / 2, 100);
			// draw selected settings
			this.selectedSettings.draw();
		}
		else{
			push();
			fill(150);
			textSize(12);
			textAlign(RIGHT);
			text('Press [enter] to open settings', width - 10, 100);
			pop();
		}
	}
	
	this.onResize = function() {
		this.settings.forEach(function(setting) {
			setting.onResize();
		})
	}
}

