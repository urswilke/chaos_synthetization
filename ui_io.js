import $ from "jquery";
import { getAllScaleNotes } from './randomNotes.js';
export function setup_table(n_curves) {
    $('#curve_params_tbl tbody').find("tr:gt(0)").remove();
    for (let i = 0; i < n_curves; i++) {
        // Clone the Template
        let $cloned = $('.template tbody').clone();
        // For each Candidate append the template row
        $('#curve_params_tbl tbody').append($cloned.html());
    }
}

  
function sample1(items) {
    // https://stackoverflow.com/a/5915122
    return items[Math.floor(Math.random() * items.length)];
}
export function set_table_values(selected_presets) {
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        
        let midi = sample1(getAllScaleNotes([0, 7], 36, 84));
        let ampli = Math.floor(midi / 6);
        let note_length = sample1([1, 2, 4]);
        let preset = sample1(Array.from(selected_presets.keys()));
        
        row.find("input.root_note").val(midi);
        row.find("input.random_amplitude").val(ampli);
        row.find("input.note_length").val(note_length);
        row.find("select.preset_multiselect").val(preset);
    });
}

export function add_table_ui_params(ui_params) {
    let root_notes = [];
    let random_amplitudes = [];
    let note_lengths = [];
    let presets = [];
    let note_checks = [];
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        root_notes.push(Number(row.find("input.root_note").val()));
        random_amplitudes.push(Number(row.find("input.random_amplitude").val()));
        note_lengths.push(Number(row.find("input.note_length").val()));
        presets.push(ui_params.selected_presets[Number(row.find("select.preset_multiselect").val())]);
        note_checks.push(row
            .find("input.note_check")
            .filter(function() {return this.checked;})
            .map(function() {return this.value;})
            .get()
            .map(Number)
        );
    });
    ui_params.ui_curve_params = {
        root_notes,
        random_amplitudes,
        note_lengths,
        presets,
        note_checks
    };
    // window.ui_curve_params = ui_curve_params;
    return ui_params;
}

export function get_presets(presets) {
    var select = document.getElementById('presets_selector');
    var preselected_presets = [1, 3, 8, 61, 63, 98];
    
    for (var i = 0; i < presets.length; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = presets[i];
        if (preselected_presets.includes(i)) {
            opt.selected = true;
        }
        select.appendChild(opt);
    }
    return $('#presets_selector').val().map(Number);
}
export function put_presets_in_table_template(selected_presets, presets) {
    var select_template = document.createElement('select');
    select_template.setAttribute("class", "preset_multiselect")
    
    for (let i = 0; i < selected_presets.length; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = presets[selected_presets[i]];
        select_template.appendChild(opt);
    }
    $( ".preset_multiselect" ).replaceWith( select_template )
}
export function get_main_ui_params(selected_presets) {
    let n_curves = Number(document.getElementById("n_curves").value);
    setup_table(n_curves);
    set_table_values(selected_presets);
    // let ui_curve_params = get_table_values();
    let scale_notes = [];
    return {
      n_curves,
      n_timesteps: Number(document.getElementById("n_timesteps").value),
      duration: Number(document.getElementById("note_dur").value) * 1000,
      midi_min: Number(document.getElementById("midi_min_string").value),
      midi_max: Number(document.getElementById("midi_max_string").value),
      scale_notes,
      selected_presets
    //   ui_curve_params
    };
  }
  
export function update_time_display(time_display_val, curve_plot_element, duration, update_period) {
    const new_timeval = (parseFloat(time_display_val.innerHTML) + update_period / 1000);
    time_display_val.innerHTML = new_timeval.toFixed(2);
    const step_plot_element = document.getElementById('stepPlot');
    curve_plot_element.update(new_timeval / duration * 1000);
  }
  