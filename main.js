import { get_main_ui_params, add_table_ui_params, setup_table, set_table_values, update_time_display } from './ui_io.js'
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

let curve_plot_element;
function update_curves() {
  ui_params = add_table_ui_params(ui_params);
  random_curve_data = add_random_curves(random_curve_data, ui_params);
  random_curve_data = add_midi_curves(random_curve_data);
  let plot_data = create_plot_data(random_curve_data);
  curve_plot_element =  plotLines(
    document.body,
    plot_data,
    getAllScaleNotes(ui_params.scale_notes)
  );
}
plot_curves();

var time_display_val = document.getElementById("time_display_field");
async function playMidi() {
  time_display_val.innerHTML = 0;
  const update_period = 50;
  const seconds_counter = setInterval(
    () => update_time_display(
      time_display_val, 
      curve_plot_element,
      ui_params.duration,
      update_period
    ), 
    update_period
  );

  let promises = await playMultipleSequences(random_curve_data);
  Promise.all(promises).then(() => {
    clearInterval(seconds_counter);
  });

}

$(document).on("change", ".reload", plot_curves)
$(document).on("change", "td, #show-scaled-random", update_curves)
$("#play-button").on('click', playMidi); 
$("#time_display_field")
  .before("time t = ")
  .after(" s");
console.log(random_curve_data)
