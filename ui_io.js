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
export function set_table_values() {
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        
        let midi = sample1(getAllScaleNotes([0, 7], 36, 84));
        let ampli = Math.floor(midi / 6);
        let note_length = sample1([1, 2, 4]);
        
        row.find("input.root_note").val(midi);
        row.find("input.random_amplitude").val(ampli);
        row.find("input.note_length").val(note_length);
    });
}

export function add_table_ui_params(ui_params) {
    let root_notes = [];
    let random_amplitudes = [];
    let note_lengths = [];
    let note_checks = [];
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        root_notes.push(Number(row.find("input.root_note").val()));
        random_amplitudes.push(Number(row.find("input.random_amplitude").val()));
        note_lengths.push(Number(row.find("input.note_length").val()));
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
        note_checks
    };
    // window.ui_curve_params = ui_curve_params;
    return ui_params;
}


export function get_main_ui_params() {
    let n_curves = Number(document.getElementById("n_curves").value);
    setup_table(n_curves);
    set_table_values();
    // let ui_curve_params = get_table_values();
    let scale_notes = [];
    return {
      n_curves,
      n_timesteps: Number(document.getElementById("n_timesteps").value),
      duration: Number(document.getElementById("note_dur").value) * 1000,
      midi_min: Number(document.getElementById("midi_min_string").value),
      midi_max: Number(document.getElementById("midi_max_string").value),
      scale_notes,
    //   ui_curve_params
    };
  }
  