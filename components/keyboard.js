function Keyboard() {

    // notes that will be available for user selection
    const notes = [
      {'note': 'C3', 'freq': 130.8128, 'position': 0, 'type': 'white'},
      {'note': 'C#3', 'freq': 138.5913, 'position': 0.5, 'type': 'black'},
      {'note': 'D3', 'freq': 146.8324, 'position': 1, 'type': 'white'},
      {'note': 'D#3', 'freq': 155.5635, 'position': 1.5, 'type': 'black'},
      {'note': 'E3', 'freq': 164.8138, 'position': 2, 'type': 'white'},
      {'note': 'F3', 'freq': 174.6141, 'position': 3, 'type': 'white'},
      {'note': 'F#3', 'freq': 184.9972, 'position': 3.5, 'type': 'black'},
      {'note': 'G3', 'freq': 195.9977, 'position': 4, 'type': 'white'},
      {'note': 'G#3', 'freq': 207.6523, 'position': 4.5, 'type': 'black'},
      {'note': 'A3', 'freq': 220.0000, 'position': 5, 'type': 'white'},
      {'note': 'A#3', 'freq': 233.0819, 'position': 5.5, 'type': 'black'},
      {'note': 'B3', 'freq': 246.9417, 'position': 6, 'type': 'white'},
      {'note': 'C4', 'freq': 261.6256, 'position': 7, 'type': 'white'},
      {'note': 'C#4', 'freq': 277.1826, 'position': 7.5, 'type': 'black'},
      {'note': 'D4', 'freq': 293.6648, 'position': 8, 'type': 'white'},
      {'note': 'D#4', 'freq': 311.1270, 'position': 8.5, 'type': 'black'},
      {'note': 'E4', 'freq': 329.6276, 'position': 9, 'type': 'white'},
      {'note': 'F4', 'freq': 349.2282, 'position': 10, 'type': 'white'},
      {'note': 'F#4', 'freq': 369.9944, 'position': 10.5, 'type': 'black'},
      {'note': 'G4', 'freq': 391.9954, 'position': 11, 'type': 'white'},
      {'note': 'G#4', 'freq': 415.3047, 'position': 11.5, 'type': 'black'},
      {'note': 'A4', 'freq': 440.0000, 'position': 12, 'type': 'white'},
      {'note': 'A#4', 'freq': 466.1638, 'position': 12.5, 'type': 'black'},
      {'note': 'B4', 'freq': 493.8833, 'position': 13, 'type': 'white'},
      {'note': 'C5', 'freq': 523.2511, 'position': 14, 'type': 'white'},
    ]

    // keyboard parameters
    const keyboard = {
      x: 0,
      y: 0,
      start: 0,
      whiteKey: {
        width: 50,
        height: 200
      },
      blackKey: {
        width: 25, 
        height: 120
      }
    }

    // separate white and black keys for drawing and hit checks
    const whiteKeys = notes.filter((note) => note.type == 'white');
    const blackKeys = notes.filter((note) => note.type == 'black');

    let currentNote = 'Play Something!';

    // set initial size values in resize function to enable responsiveness
    // call resize function immediately to set values on first load
    this.resize = function() {
      keyboardX = width / 2;
      keyboardY = height / 4 * 3;
      keyboardStart = keyboardX - (whiteKeys.length * keyboard.whiteKey.width / 2);
    };
    this.resize();

    this.draw = function() {

      // draw keyboard to the screen
      push();
      fill(255)
      whiteKeys.forEach(key => { rect( keyboardStart + key.position * keyboard.whiteKey.width,
                                      keyboardY, 
                                      keyboard.whiteKey.width, 
                                      keyboard.whiteKey.height) });
      fill(0)
      blackKeys.forEach(key => { rect( (keyboardStart + (key.position * 2) * keyboard.blackKey.width) + (keyboard.blackKey.width/2),
                                        keyboardY,
                                        keyboard.blackKey.width,
                                        keyboard.blackKey.height) });
      pop();

      // draw note
      push();
      stroke(255);
      strokeWeight(2);
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text(currentNote, width / 2, height / 5);
      pop();
    }

    this.mousePressed = function() {

    // check if mouse press is within keyboard
    if(mouseY > keyboardY && mouseY < keyboardY + keyboard.whiteKey.height) {

      // check if black key pressed
      for(i = 0; i < blackKeys.length; i++) {
        if( mouseX > ((keyboardStart + (blackKeys[i].position * 2) * keyboard.blackKey.width) + (keyboard.blackKey.width/2)) 
            && mouseX < (((keyboardStart + (blackKeys[i].position * 2) * keyboard.blackKey.width) + (keyboard.blackKey.width/2)) + keyboard.blackKey.width)
            && mouseY > keyboardY
            && mouseY < (keyboardY + keyboard.blackKey.height)){
              vis.selectedVisual.playNote(blackKeys[i].freq);
              currentNote = blackKeys[i].note;
              return
        }
      }

      // if no black key pressed, check if white key pressed
      for(i = 0; i < whiteKeys.length; i++) {
        if( mouseX > (keyboardStart + whiteKeys[i].position * keyboard.whiteKey.width) 
            && mouseX < ((keyboardStart + whiteKeys[i].position * keyboard.whiteKey.width) + keyboard.whiteKey.width)){
              vis.selectedVisual.playNote(whiteKeys[i].freq);
              currentNote = whiteKeys[i].note;
              return
        }
      }
    }
  }

  // stop note when mouse released
  this.mouseReleased = function() {
    vis.selectedVisual.stopNote();
    currentNote = 'Play Something!';
  }

}