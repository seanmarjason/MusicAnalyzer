
function LevelsSettings() {
  this.name = "Levels Settings"

  let settings = [];
  let levelsSettings;

  this.onResize = function() {
    levelsSettings = {x: width/2, y: 200}
  }
  this.onResize();

  this.open = function() {

    let bassToggle = new Checkbox(  levelsSettings.x + 100, levelsSettings.y + 50,
                                vis.selectedVisual.plots.bass,
                                () => vis.selectedVisual.togglePlot('bass')
                              );

    let lowMidToggle = new Checkbox(  levelsSettings.x + 100, levelsSettings.y + 100,
                                  vis.selectedVisual.plots.lowMid,
                                  () => vis.selectedVisual.togglePlot('lowMid')
                                );

    let midToggle = new Checkbox( levelsSettings.x + 100, levelsSettings.y + 150,
                              vis.selectedVisual.plots.mid,
                              () => vis.selectedVisual.togglePlot('mid')
                            );

    let highMidToggle = new Checkbox( levelsSettings.x + 100, levelsSettings.y + 200,
                                  vis.selectedVisual.plots.highMid,
                                  () => vis.selectedVisual.togglePlot('highMid')
                                );

    let trebleToggle = new Checkbox(  levelsSettings.x + 100, levelsSettings.y + 250,
                                  vis.selectedVisual.plots.treble,
                                  () => vis.selectedVisual.togglePlot('treble')
                                );

    settings.push(bassToggle, lowMidToggle, midToggle, highMidToggle, trebleToggle);

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
    settings.forEach(setting => setting.remove());
  }
}