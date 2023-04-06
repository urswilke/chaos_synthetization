import { update_table, getChecked, get_table_values } from './jquery_functions.js'
import { RandomMidiCurves, gen_random_curves_array } from "./randomNotes.js";
// var ui_curve_params = {};

async function get_ui_params() {
  await update_table();
  let ui_curve_params = await get_table_values();
  // await sync_table_values();
  let scale_notes = await getChecked();
  return {
    n_curves: Number(document.getElementById("n_curves").value),
    n_timesteps: Number(document.getElementById("n_timesteps").value),
    duration: Number(document.getElementById("note_dur").value) * 1000,
    midi_min: Number(document.getElementById("midi_min_string").value),
    midi_max: Number(document.getElementById("midi_max_string").value),
    scale_notes,
    ui_curve_params
  };
}

function gen_random_curves() {
  ui_params = get_ui_params();
  rmc.update_curve_data(ui_params);
  rmc.plot();
}
var ui_params = await get_ui_params();
const rmc = new RandomMidiCurves(ui_params) 
rmc.plot();
document.getElementById("gen-random-curves-button").addEventListener('click', gen_random_curves);




function adaptToSelectedNotes() {
    rmc.play();
}

document.getElementById("plot-and-play-button").addEventListener('click', adaptToSelectedNotes);

// update_table();
// sync_table_values();


var oo = gen_random_curves_array(ui_params);
console.log(oo)