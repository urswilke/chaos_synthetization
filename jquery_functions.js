import $ from "jquery";
import { getAllScaleNotes } from './randomNotes.js';
export async function update_table() {
    $('[name="n_curves_input"]').on('change', setup_table)
    // this also fires the function when ready in the beginning:
    // (see here: https://stackoverflow.com/a/28703262)
    .trigger('change');
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
    // get_table_values();

}
export async function sync_table_values() {
    $(document).on("change", "td", get_table_values)
}

  
function rand_root_notes() {
    let items = getAllScaleNotes([0, 7], 36, 84);
    // https://stackoverflow.com/a/5915122
    return items[Math.floor(Math.random() * items.length)];
}
export function set_table_values() {
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        
        let midi = rand_root_notes();
        let ampli = Math.floor(midi / 6);
        
        row.find("input.root_note").val(midi);
        row.find("input.random_amplitude").val(ampli);
    });
}

export function get_table_values() {
    let root_notes = [];
    let random_amplitudes = [];
    let note_checks = [];
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let row = $(this);
        root_notes.push(Number(row.find("input.root_note").val()));
        random_amplitudes.push(Number(row.find("input.random_amplitude").val()));
        note_checks.push(row
            .find("input.note_check")
            .filter(function() {return this.checked;})
            .map(function() {return this.value;})
            .get()
            .map(Number)
        );
    });
    const ui_curve_params = {
        root_notes,
        random_amplitudes,
        note_checks
    };
    // window.ui_curve_params = ui_curve_params;
    return ui_curve_params;
}