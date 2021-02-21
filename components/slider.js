function Slider(x, y, start, end, increment, value, callback, style='horizontal' ) {

  this.slider = createSlider(start, end, value, increment);

  this.slider.position(x, y);
  style=='verticle' && this.slider.style('transform', 'rotate(270deg)');

  this.value = this.slider.value();

  this.slider.changed(() => {
    this.value = this.slider.value();
    callback();
  });

  this.remove = () => this.slider.remove();
}