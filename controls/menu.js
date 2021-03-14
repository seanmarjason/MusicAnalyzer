// Constructor to handle creation of menu listing all visualisations
// @param displayed: boolean tracking if menu is enabled
// @method onResize: set size values in resize function to enable responsiveness
// @method draw: draw menu to canvas
function Menu() {

	// set boolean to toggle menu on / off
	this.displayed = false;

	// set initial size values in resize function to enable responsiveness
	// call resize function immediately to set values on first load
	this.onResize = function() {
		this.x = 20;
		this.y = 120;
	}
	this.onResize();

	// draw menu to canvas
  this.draw = function(){
		noStroke();
		fill(255);
		rect(0, 75, 400, height - 75 - 3);
		fill(33, 33, 33);
		textSize(20);
		text("Select a tool using number keys:", this.x, this.y);

		//draw out menu items for each visualisation
		for(let i = 0; i < vis.visuals.length; i++){
			const yLoc = this.y + 70 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, this.x, yLoc);
		}
	};

}