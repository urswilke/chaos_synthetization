import { update_table, get_table_values, sync_table_values } from './jquery_functions.js'
import { RandomMidiCurves, gen_random_curves_array, getAllScaleNotes } from "./randomNotes.js";
import playMultipleSequences from './playNotes.js'
import plotLines from "./plot.js";

// var ui_curve_params = {};
var ui_params = await get_ui_params();

async function get_ui_params() {
  await update_table();
  let ui_curve_params = await get_table_values();
  // await sync_table_values();
  let scale_notes = [];
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





document.getElementById("plot-and-play-button").addEventListener('click', adaptToSelectedNotes);


var random_curve_data = gen_random_curves_array(ui_params);

function adaptToSelectedNotes() {
  playMultipleSequences(random_curve_data.map((x) => x.midi_curve), ui_params.duration)
}


function create_plot_data(x) {
  let elements = new Array(x.length);
  for (let l = 0; l < x.length; l++) {
    elements[l] = x[l].midi_curve
      .map(function(el, i) {
        return {
          l,
          i,
          midi: el
        }
    });
  }
  return elements.flat();
}
let plot_data = create_plot_data(random_curve_data);
function gen_random_curves() {
  plotLines(
    document.body,
    plot_data,
    getAllScaleNotes(ui_params.scale_notes)
  )
  // ui_params = get_ui_params();
  // rmc.update_curve_data(ui_params);
  // rmc.plot();
}
// gen_random_curves()

document.getElementById("gen-random-curves-button").addEventListener('click', gen_random_curves);

console.log(random_curve_data)
