// Constructor to create colour picker DOM elements using p5.Dom
// @param x: position on the x axis
// @param y: position on the y axis
// @param value: initial value
// @param callback: function to call when value amended
function ColourPicker(x, y, value, callback) {

  this.colourPicker = createColorPicker(value);

  this.colourPicker.position(x, y);

  this.colour = this.colourPicker.color();

  this.colourPicker.changed(() => {
    this.colour = this.colourPicker.color();
    callback(); // use callback passed in to constructor
  });

  this.remove = () => this.colourPicker.remove();
}