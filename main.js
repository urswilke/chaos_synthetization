import { get_main_ui_params, add_table_ui_params, setup_table, set_table_values, update_time_display, get_presets, put_presets_in_table_template } from './ui_io.js'
import { getAllScaleNotes, create_plot_data, add_midi_curves, gen_random_curves_array, add_random_curves } from "./randomNotes.js";
import playMultipleSequences from './playNotes.js'
import plotLines from "./plot.js";
import $ from "jquery";
import { loadSoundfont } from 'sfumato';

var sf2 = await loadSoundfont(
  // 'https://raw.githubusercontent.com/surikov/webaudiofontdata/master/sf2/Acoustic%20Guitar.sf2'
  'https://raw.githubusercontent.com/felixroos/felixroos.github.io/main/public/Earthbound_NEW.sf2'
  // 'https://raw.githubusercontent.com/urswilke/chaos_synthetization/main/public/052_Florestan_Ahh_Choir.sf2'
)

var ui_params;
var random_curve_data;
var presets = sf2.presets.map(x => x.header.name);
var selected_presets;

function plot_curves() {
  selected_presets = get_presets(presets);
  put_presets_in_table_template(selected_presets, presets);

  ui_params = get_main_ui_params(selected_presets);
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

  let promises = await playMultipleSequences(random_curve_data, sf2);
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


