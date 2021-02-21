
function LevelsSettings() {
  this.name = "Levels Settings"

  var levelsSettings;
  var bassToggle;
  var lowMidToggle;
  var midToggle;
  var highMidToggle;
  var trebleToggle;

  this.onResize = function() {
    levelsSettings = {x: width/2, y: 200}
  }
  this.onResize();

  this.open = function() {
    bassToggle = createCheckbox('', vis.selectedVisual.plots.bass);
    bassToggle.position(levelsSettings.x + 100, levelsSettings.y + 50);
    bassToggle.changed(() => vis.selectedVisual.togglePlot('bass'));

    lowMidToggle = createCheckbox('', vis.selectedVisual.plots.lowMid);
    lowMidToggle.position(levelsSettings.x + 100, levelsSettings.y + 100);
    lowMidToggle.changed(() => vis.selectedVisual.togglePlot('lowMid'));

    midToggle = createCheckbox('', vis.selectedVisual.plots.mid);
    midToggle.position(levelsSettings.x + 100, levelsSettings.y + 150);
    midToggle.changed(() => vis.selectedVisual.togglePlot('mid'));

    highMidToggle = createCheckbox('', vis.selectedVisual.plots.highMid);
    highMidToggle.position(levelsSettings.x + 100, levelsSettings.y + 200);
    highMidToggle.changed(() => vis.selectedVisual.togglePlot('highMid'));

    trebleToggle = createCheckbox('', vis.selectedVisual.plots.treble);
    trebleToggle.position(levelsSettings.x + 100, levelsSettings.y + 250);
    trebleToggle.changed(() => vis.selectedVisual.togglePlot('treble'));
  }

  this.draw = function() {
    text(this.name, width / 2, 100);

    text('Bass', levelsSettings.x, levelsSettings.y + 65);
    text('Low Mid', levelsSettings.x, levelsSettings.y + 115);
    text('Mid', levelsSettings.x, levelsSettings.y + 165);
    text('High Mid', levelsSettings.x, levelsSettings.y + 215);
    text('Treble', levelsSettings.x, levelsSettings.y + 265);
  }

  this.close = function() {
    bassToggle.remove();
    lowMidToggle.remove();
    midToggle.remove();
    highMidToggle.remove();
    trebleToggle.remove();
  }
}