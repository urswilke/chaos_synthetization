import { update_table, getChecked, get_table_values } from './jquery_functions.js'
import { RandomMidiCurves } from "./randomNotes.js";
var ui_curve_params = {};

function get_ui_params() {
  return {
    n_curves: Number(document.getElementById("n_curves").value),
    n_timesteps: Number(document.getElementById("n_timesteps").value),
    duration: Number(document.getElementById("note_dur").value) * 1000,
    midi_min: Number(document.getElementById("midi_min_string").value),
    midi_max: Number(document.getElementById("midi_max_string").value),
    scale_notes: getChecked(),
  };
}

function gen_random_curves() {
  let ui_params = get_ui_params();
  rmc.update_curve_data(ui_params);
  rmc.plot();
}
var ui_params = get_ui_params();
const rmc = new RandomMidiCurves(ui_params) 
rmc.plot();
document.getElementById("gen-random-curves-button").addEventListener('click', gen_random_curves);




function adaptToSelectedNotes() {
    rmc.play();
}

document.getElementById("plot-and-play-button").addEventListener('click', adaptToSelectedNotes);

update_table();


document.getElementById("gen_para_tbl").addEventListener('click', get_table_values);
