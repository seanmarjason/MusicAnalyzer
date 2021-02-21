function Checkbox(x, y, value, callback) {

  this.checkbox = createCheckbox('', value);

  this.checkbox.position(x, y);

  this.value = this.checkbox.value();

  this.checkbox.changed(() => {
    this.value = this.checkbox.value();
    callback();
  });

  this.remove = () => this.checkbox.remove();
}