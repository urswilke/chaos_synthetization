import playMultipleSequences from './playNotes.js'

import plotLines from "./plot.js";
import * as RndNotes from "./randomNotes.js";
var noteArraysRaw = RndNotes.gen_mult_arrays(10, 30);
const duration = 500;

function adaptToSelectedNotes() {
    var scaleNotes = RndNotes.getChecked();
    var allScaleNotes = RndNotes.getAllScaleNotes(scaleNotes);
    RndNotes.multAddClosestScaleNotes(noteArraysRaw, allScaleNotes);
    var noteArraysArray = RndNotes.genArraysArray(noteArraysRaw);
    let noteArrayFlat = RndNotes.gen_mult_arrays_flat(noteArraysRaw)
    plotLines(document.body, noteArrayFlat, allScaleNotes);
    playMultipleSequences(
      noteArraysArray, 
      duration
    );
}
// adaptToSelectedNotes();


document.getElementById("plot-and-play-button").addEventListener('click', adaptToSelectedNotes);


