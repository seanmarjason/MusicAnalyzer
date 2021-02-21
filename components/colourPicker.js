function ColourPicker(x, y, value, callback) {

  this.colourPicker = createColorPicker(value);

  this.colourPicker.position(x, y);

  this.colour = this.colourPicker.color();

  this.colourPicker.changed(() => {
    this.colour = this.colourPicker.color();
    callback();
  });

  this.remove = () => this.colourPicker.remove();
}