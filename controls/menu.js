function Menu() {
  this.displayed = false;
	this.menuX = 20;
  this.menuY = 120;
  
  this.draw = function(){
		noStroke();
		fill(255);
		rect(0, 75, 400, height - 75 - 3);
		fill(33, 33, 33);
		textSize(20);
		text("Select a tool using number keys:", this.menuX, this.menuY);

		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = this.menuY + 70 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, this.menuX, yLoc);
		}
	};

}