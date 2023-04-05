import $ from "jquery";
import { getAllScaleNotes } from './randomNotes.js';
export function update_table() {
    $('[name="n_curves_input"]').on('change', setup_table)
    // this also fires the function when ready in the beginning:
    // (see here: https://stackoverflow.com/a/17247289)
    .change();
}
function setup_table() {
    // Not checking for Invalid input
    if (this.value != '') {
        let val = parseInt(this.value, 10);

        $('#curve_params_tbl tbody').find("tr:gt(0)").remove();
        for (let i = 0; i < val; i++) {
            // Clone the Template
            let $cloned = $('.template tbody').clone();
            // For each Candidate append the template row
            $('#curve_params_tbl tbody').append($cloned.html());
        }
    }
    set_table_values();
    get_table_values();

}

export function getChecked() {
    let ids = $("fieldset :checkbox")
        .filter(function() {return this.checked;})
        .map(function() {return this.value;})
        .get()
        .map(Number);
    return ids;
}
  
function rand_root_notes() {
    let items = getAllScaleNotes([0, 7], 36, 84);
    // https://stackoverflow.com/a/5915122
    return items[Math.floor(Math.random() * items.length)];
}
export function set_table_values() {
    let countr = 0;
    // let note_checks = new Array();
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        
        let midi = rand_root_notes();
        let ampli = Math.floor(midi / 3);
        
        row.find("input.root_note").val(midi);
        row.find("input.random_amplitude").val(ampli);
        
        countr += 1;
    });
}

export function get_table_values() {
    let countr = 0;
    let root_notes = new Array();
    let random_amplitudes = new Array();
    let note_checks = new Array();
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        root_notes[countr] = Number(row.find("input.root_note").val());
        random_amplitudes[countr] = Number(row.find("input.random_amplitude").val());
        note_checks[countr] = row
            .find("input.note_check")
            .filter(function() {return this.checked;})
            .map(function() {return this.value;})
            .get()
            .map(Number);
        countr += 1;
    });
    window.ui_curve_params = {
        root_notes,
        random_amplitudes,
        note_checks
    };
}