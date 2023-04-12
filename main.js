import { get_ui_params, add_table_values, setup_table, set_table_values } from './ui_io.js'
import { getAllScaleNotes, create_plot_data, gen_midi_curves_array, add_random_curves_array, gen_curves_array } from "./randomNotes.js";
import playMultipleSequences from './playNotes.js'
import plotLines from "./plot.js";
import $ from "jquery";

var ui_params;
var random_curve_data;
function gen_params() {
  ui_params = get_ui_params();
  ui_params = add_table_values(ui_params);
  random_curve_data = add_random_curves_array(ui_params);
  // random_curve_data = gen_curves_array(random_curve_data, ui_params);
  plot_curves();
}
function plot_curves() {
  ui_params = add_table_values(ui_params);
  random_curve_data = gen_curves_array(random_curve_data, ui_params);
  // random_curve_data = add_random_curves_array(random_curve_data);
  random_curve_data = gen_midi_curves_array(random_curve_data);
  let plot_data = create_plot_data(random_curve_data);
  plotLines(
    document.body,
    plot_data,
    getAllScaleNotes(ui_params.scale_notes)
  )
}
gen_params();
plot_curves();




function adaptToSelectedNotes() {
  playMultipleSequences(random_curve_data.map((x) => x.midi_curve), ui_params.duration)
}

$(document).on("change", ".sync", gen_params)
$(document).on("change", "td", plot_curves)
$("#plot-and-play-button").on('click', adaptToSelectedNotes); 

console.log(random_curve_data)
