function Menu() {

	this.onResize = function() {
		this.x = 20;
		this.y = 120;
	}
	this.onResize();

  this.displayed = false;

  this.draw = function(){
		noStroke();
		fill(255);
		rect(0, 75, 400, height - 75 - 3);
		fill(33, 33, 33);
		textSize(20);
		text("Select a tool using number keys:", this.x, this.y);

		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = this.y + 70 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, this.x, yLoc);
		}
	};

}