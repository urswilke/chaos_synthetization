
import RandomMidiCurves from "./randomNotes.js";

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
  rmc.plot();
}
var duration, n_timesteps, midi_min, midi_max, n_curves, scale_notes;
get_ui_params();
const rmc = new RandomMidiCurves(n_curves, n_timesteps, midi_min, midi_max, scale_notes, duration) 
rmc.plot();
document.getElementById("gen-random-curves-button").addEventListener('click', gen_random_curves);




function adaptToSelectedNotes() {
    rmc.play();
}

document.getElementById("plot-and-play-button").addEventListener('click', adaptToSelectedNotes);

