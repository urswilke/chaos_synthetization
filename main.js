import playMultipleSequences from './playNotes.js'

import plotLines from "./plot.js";
import * as RndNotes from "./randomNotes.js";

function getChecked() {
  let ids = $("fieldset :checkbox")
      .filter(function() {return this.checked;})
      .map(function() {return this.value;})
      .get()
      .map(Number);
  return ids;
}
function get_ui_params() {
  n_curves = Number(document.getElementById("n_curves").value);
  n_timesteps = Number(document.getElementById("n_timesteps").value);
  duration = Number(document.getElementById("note_dur").value) * 1000;
  midi_min = Number(document.getElementById("midi_min_string").value)
  midi_max = Number(document.getElementById("midi_max_string").value)
  scale_notes = getChecked();
}

function gen_random_curves() {
  get_ui_params();
  allScaleNotes = RndNotes.getAllScaleNotes(scale_notes, midi_min, midi_max);
  noteArraysRaw = RndNotes.gen_mult_arrays(n_curves, n_timesteps, midi_min, midi_max);
  RndNotes.multAddClosestScaleNotes(noteArraysRaw, allScaleNotes);
  let noteArraysArray = RndNotes.genArraysArray(noteArraysRaw);
  let noteArrayFlat = RndNotes.gen_mult_arrays_flat(noteArraysRaw)
  plotLines(document.body, noteArrayFlat, allScaleNotes);
}
var duration, n_timesteps, midi_min, midi_max, n_curves, scale_notes, allScaleNotes, noteArraysRaw;
gen_random_curves()
document.getElementById("gen-random-curves-button").addEventListener('click', gen_random_curves);




function adaptToSelectedNotes() {
  // gen_random_curves();
    let noteArrayFlat = RndNotes.gen_mult_arrays_flat(noteArraysRaw)
    let noteArraysArray = RndNotes.genArraysArray(noteArraysRaw);
    plotLines(document.body, noteArrayFlat, allScaleNotes);
    playMultipleSequences(
      noteArraysArray, 
      duration
    );
}
// adaptToSelectedNotes();


document.getElementById("plot-and-play-button").addEventListener('click', adaptToSelectedNotes);


