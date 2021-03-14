// Constructor to display and handles clicks on the playback button
// @param playing: boolean tracking if playback set to playing
// @param enabled: boolean tracking if playback button is enabled / can be clicked
// @method onResize: set size values in resize function to enable responsiveness
// @method draw: draw button to canvas
// @method hitCheck: check if user clicks on playback button, and play / pause track
function PlaybackButton(){

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;
	this.enabled = true;

	// set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
	this.onResize = function() {
		this.x = 30;
		this.y = 25;
		this.width = 20;
		this.height = 20;
	}
	this.onResize();

	// draw button to canvas
	this.draw = function(){
		if(this.playing){
			push();
			fill("white");
			stroke("black");
			strokeWeight(2);
			// draw pause button
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
			pop();
		}
		else if (!this.enabled){
			push();
			noFill();
			stroke(75);
			strokeWeight(6)
			// draw loading icon
			circle(this.x + this.width / 2, this.y + this.height / 2, this.width,	this.height);
			pop();
		}
		else {	
			push();
			fill("white");
			stroke("black");
			strokeWeight(2);
			// draw play icon
			triangle(	this.x, this.y, 
								this.x + this.width, this.y + this.height/2, 
								this.x, this.y+this.height);
			pop();
		}
	};

	//checks for clicks on the button.
	//returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(	this.enabled 
				&& mouseX > this.x 	&& mouseX < this.x + this.width 
				&& mouseY > this.y 	&& mouseY < this.y + this.height){
  			this.playing = !this.playing;
  			return true;
		}
			return false;
	};

}