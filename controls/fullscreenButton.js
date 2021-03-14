//displays and handles clicks on the fullscreen button.
function FullscreenButton(){
	
	// set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
	this.onResize = function() {
		this.x = width - 50;
		this.y = 35;
		this.width = 20;
		this.height = 20;
	};
	this.onResize()

	//flag to determine whether to expand or collapse on button click and
	//to determine which icon to draw
	this.enabled = false;

	this.draw = function(){
		if(this.enabled){
			push();
			stroke(255);
			strokeWeight(2)
			fill(255);
			// draw upwards arrow
			triangle(	this.x - this.width / 2, this.y + this.height / 2, 
								this.x - this.width / 2, this.y, 
								this.x, this.y + this.height / 2);
			line(	this.x - this.width / 2, this.y + this.height / 2, 
						this.x + this.width / 2, this.y - this.height / 2);
			pop();
		}
		else {	
			push();
			stroke(255);
			strokeWeight(2)
			fill(255);
			// draw downwards arrow
			triangle(	this.x + this.width / 2, this.y - this.height / 2, 
								this.x + this.width / 2, this.y, 
								this.x, this.y - this.height / 2);
			line(	this.x + this.width / 2, this.y - this.height / 2, 
						this.x - this.width / 2, this.y + this.height / 2);
			pop();
		}
	};

	//checks for clicks on the button, opens or closes fullsceen
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(	mouseX > this.x - this.width	&& mouseX < this.x + this.width 
				&& mouseY > this.y - this.height	&& mouseY < this.y + this.height){
				const fs = fullscreen();
				fullscreen(!fs);
  			this.enabled = !this.enabled;
  			return true;
		}
			return false;
	};
	
}