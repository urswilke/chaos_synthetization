import playMultipleSequences from './playNotes.js'

import plotLines from "./plot.js";
import * as RndNotes from "./randomNotes.js";
var noteArrays = RndNotes.gen_mult_arrays(10, 30);

function adaptToSelectedNotes() {
    var scaleNotes = RndNotes.getChecked();
    var allScaleNotes = RndNotes.getAllScaleNotes(scaleNotes);
    let noteArrayFlat = RndNotes.gen_mult_arrays_flat(noteArrays)
    plotLines(document.body, noteArrayFlat, allScaleNotes);
}
adaptToSelectedNotes();


document.getElementById("get-notes-button").addEventListener('click', adaptToSelectedNotes);


const notes1 = [60, 62, 64, 65, 67, 67, 60];
const notes2 = [64, 65, 67, 67, 60, 60, 62];
const duration = 500;
document
  .getElementById("play-multiple-sequences")
  .addEventListener(
    'click', 
    playMultipleSequences.bind(
      null, 
      [notes1, notes2], 
      duration
    )
  );
