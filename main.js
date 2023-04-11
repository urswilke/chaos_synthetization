import { get_ui_params, get_table_values, setup_table_helper, set_table_values } from './ui_io.js'
import { gen_random_curves_array, getAllScaleNotes, create_plot_data } from "./randomNotes.js";
import playMultipleSequences from './playNotes.js'
import plotLines from "./plot.js";
import $ from "jquery";

var ui_params = get_ui_params();
var random_curve_data = gen_random_curves_array(ui_params);

function plot_curves() {
  let plot_data = create_plot_data(random_curve_data);
  plotLines(
    document.body,
    plot_data,
    getAllScaleNotes(ui_params.scale_notes)
  )
}
plot_curves();

$("#plot-and-play-button").on('click', function(){
  adaptToSelectedNotes();
}); 



function adaptToSelectedNotes() {
  playMultipleSequences(random_curve_data.map((x) => x.midi_curve), ui_params.duration)
}

// export function get_ui_params_async() {
//   setup_table_helper();
//   set_table_values();
//   return get_table_values();
// }

// async function gen_random_curves(ui_params) {
//   ui_params = get_ui_params();
//   plotLines(
//     document.body,
//     plot_data,
//     getAllScaleNotes(ui_params.scale_notes)
//   )
// }
// $(gen_random_curves);
// $(document).on("change", "td", function() {
//   ui_params = get_ui_params_async();
// })
// $("#gen-random-curves-button").on('click', function(){
//   gen_random_curves();
// }); 

console.log(random_curve_data)
