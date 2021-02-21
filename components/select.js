function Select(x, y, options, selectedOption, callback ) {

  this.select = createSelect();

  this.select.position(x, y);
  this.select.size(100, 25);

  options.forEach(option => this.select.option(option));
  this.select.selected(selectedOption);

  this.value = this.select.value();

  this.select.changed(() => {
    this.value = this.select.value();
    callback();
  });

  this.remove = () => this.select.remove();
}