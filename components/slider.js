// Constructor to create slider DOM elements using p5.Dom
// @param x: position on the x axis
// @param y: position on the y axis
// @param start: value when slider is set to minimum
// @param end: value when slider is set to maximum
// @param increment: amount the value is increment with each step of slider
// @param value: initial value
// @param callback: function to call when value amended
// @param style: horizontal / vertical
function Slider(x, y, start, end, increment, value, callback, style='horizontal' ) {

  this.slider = createSlider(start, end, value, increment);
  this.slider.position(x, y);
  this.value = this.slider.value();

  // if style parameter verticle, rotate slider
  style=='verticle' && this.slider.style('transform', 'rotate(270deg)');

  this.slider.changed(() => {
    this.value = this.slider.value();
    callback(); // use callback passed in to constructor
  });

  this.remove = () => this.slider.remove();
}