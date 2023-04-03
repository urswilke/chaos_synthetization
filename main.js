import playMultipleSequences from './playNotes.js'

import plotLines from "./plot.js";
import * as RndNotes from "./randomNotes.js";

function get_n_curves() {
  n_curves = Number(document.getElementById("n_curves").value);
}
function get_n_timesteps() {
  n_timesteps = Number(document.getElementById("n_timesteps").value);
}
function get_note_dur() {
  duration = Number(document.getElementById("note_dur").value) * 1000;
}
function get_midi_range() {
  midi_min = Number(document.getElementById("midi_min_string").value)
  midi_max = Number(document.getElementById("midi_max_string").value)
}

function gen_random_curves() {
  get_midi_range();
  get_n_curves();
  get_n_timesteps();
  get_note_dur();
  let scaleNotes = RndNotes.getChecked();
  allScaleNotes = RndNotes.getAllScaleNotes(scaleNotes, midi_min, midi_max);
  noteArraysRaw = RndNotes.gen_mult_arrays(n_curves, n_timesteps, midi_min, midi_max);
  RndNotes.multAddClosestScaleNotes(noteArraysRaw, allScaleNotes);
  let noteArraysArray = RndNotes.genArraysArray(noteArraysRaw);
  let noteArrayFlat = RndNotes.gen_mult_arrays_flat(noteArraysRaw)
  plotLines(document.body, noteArrayFlat, allScaleNotes);
}
var duration, n_timesteps, midi_min, midi_max, n_curves, allScaleNotes, noteArraysRaw;
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


