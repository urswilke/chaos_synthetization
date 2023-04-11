import { get_ui_params } from './jquery_functions.js'
import { gen_random_curves_array, getAllScaleNotes, create_plot_data } from "./randomNotes.js";
import playMultipleSequences from './playNotes.js'
import plotLines from "./plot.js";

var ui_params;



ui_params = await get_ui_params();




document.getElementById("plot-and-play-button").addEventListener('click', adaptToSelectedNotes);


var random_curve_data = gen_random_curves_array(ui_params);

function adaptToSelectedNotes() {
  playMultipleSequences(random_curve_data.map((x) => x.midi_curve), ui_params.duration)
}


let plot_data = create_plot_data(random_curve_data);
async function gen_random_curves() {
  ui_params = await get_ui_params();
  plotLines(
    document.body,
    plot_data,
    getAllScaleNotes(ui_params.scale_notes)
  )
}

document.getElementById("gen-random-curves-button").addEventListener('click', gen_random_curves);

console.log(random_curve_data)
