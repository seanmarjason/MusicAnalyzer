// Constructor to create select DOM elements using p5.Dom
// @param x: position on the x axis
// @param y: position on the y axis
// @param options: array of options to be available in select dropdown
// @param selectedOption: initial value
// @param callback: function to call when value amended
function Select(x, y, options, selectedOption, callback ) {

  this.select = createSelect();

  this.select.position(x, y);
  this.select.size(100, 25);

  options.forEach(option => this.select.option(option));
  this.select.selected(selectedOption);

  this.value = this.select.value();

  this.select.changed(() => {
    this.value = this.select.value();
    callback(); // use callback passed in to constructor
  });

  this.remove = () => this.select.remove();
}