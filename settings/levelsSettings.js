// Constructor to create user customisable settings for levels visualiser
// @param name: Title to be used for settings pane
// @method onResize: set size values in resize function to enable responsiveness
// @method open: create settings elements on opening settings pane
// @method draw: create labels for settings
// @method close: remove settings elements on closing settings pane
function LevelsSettings() {
  this.name = "Levels Settings"

  let settings = [];
  let levelsSettings; //store location parameters

  // set settings location
  this.onResize = function() {
    levelsSettings = {x: width/2, y: 200}
  }
  this.onResize();

  // create DOM elements only on open
  // avoids multiple elements created in draw loop
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

  // Draw labels for settings
  this.draw = function() {
    text(this.name, width / 2, 100);
    text('Bass', levelsSettings.x, levelsSettings.y + 65);
    text('Low Mid', levelsSettings.x, levelsSettings.y + 115);
    text('Mid', levelsSettings.x, levelsSettings.y + 165);
    text('High Mid', levelsSettings.x, levelsSettings.y + 215);
    text('Treble', levelsSettings.x, levelsSettings.y + 265);
  }

  // remove DOM elements on close
  // ensures elements do not overlap with current canvas
  this.close = function() {
    settings.forEach(setting => setting.remove());
  }
}