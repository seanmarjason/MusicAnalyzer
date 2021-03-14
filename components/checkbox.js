// Constructor to create checkbox DOM elements using p5.Dom
// @param x: position on the x axis
// @param y: position on the y axis
// @param value: initial value
// @param callback: function to call when value amended
function Checkbox(x, y, value, callback) {

  this.checkbox = createCheckbox('', value);
  this.checkbox.position(x, y);
  this.value = this.checkbox.value();

  this.checkbox.changed(() => {
    this.value = this.checkbox.value();
    callback(); // use callback passed in to constructor
  });

  this.remove = () => this.checkbox.remove(); 
}