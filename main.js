import { get_main_ui_params, add_table_ui_params, setup_table, set_table_values } from './ui_io.js'
import { getAllScaleNotes, create_plot_data, add_midi_curves, gen_random_curves_array, add_random_curves } from "./randomNotes.js";
import playMultipleSequences from './playNotes.js'
import plotLines from "./plot.js";
import $ from "jquery";

var ui_params;
var random_curve_data;
function plot_curves() {
  ui_params = get_main_ui_params();
  ui_params = add_table_ui_params(ui_params);
  random_curve_data = gen_random_curves_array(ui_params);
  update_curves();
}
function update_curves() {
  ui_params = add_table_ui_params(ui_params);
  random_curve_data = add_random_curves(random_curve_data, ui_params);
  random_curve_data = add_midi_curves(random_curve_data);
  let plot_data = create_plot_data(random_curve_data);
  plotLines(
    document.body,
    plot_data,
    getAllScaleNotes(ui_params.scale_notes)
  )
}
plot_curves();

function adaptToSelectedNotes() {
  playMultipleSequences(random_curve_data.map((x) => x.midi_curve), ui_params.duration)
}

$(document).on("change", ".sync", plot_curves)
$(document).on("change", "td, #show-scaled-random", update_curves)
$("#plot-and-play-button").on('click', adaptToSelectedNotes); 

console.log(random_curve_data)
