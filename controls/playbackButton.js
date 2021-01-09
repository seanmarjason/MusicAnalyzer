//displays and handles clicks on the playback button.
function PlaybackButton(){

	this.onResize = function() {
		this.x = 30;
		this.y = 25;
		this.width = 20;
		this.height = 20;
	}

	this.onResize();
	
	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;
	this.enabled = true;

	this.draw = function(){
		if(this.playing){
			push();
			fill("white");
			stroke("black");
			strokeWeight(2);
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
			pop();
		}
		else if (!this.enabled){
			push();
			noFill();
			stroke(75);
			strokeWeight(6)
			circle(this.x + this.width / 2, this.y + this.height / 2, this.width,	this.height);
			pop();
		}
		else {	
			push();
			fill("white");
			stroke("black");
			strokeWeight(2);
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);
			pop();
		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(	this.enabled 
				&& mouseX > this.x 	&& mouseX < this.x + this.width 
				&& mouseY > this.y 	&& mouseY < this.y + this.height){
			if (sound.isPlaying()) {
    			sound.pause();
  			} else {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
			return false;
	};

}