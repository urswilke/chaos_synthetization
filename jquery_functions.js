import $ from "jquery";
import { getAllScaleNotes } from './randomNotes.js';
export function add_table_rows() {
    $('[name="n_curves_input"]').on('change', function () {
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
    })
    // this also fires the function when ready in the beginning:
    // (see here: https://stackoverflow.com/a/17247289)
    .change();
        
}

export function getChecked() {
    let ids = $("fieldset :checkbox")
        .filter(function() {return this.checked;})
        .map(function() {return this.value;})
        .get()
        .map(Number);
    return ids;
}
  
export function get_inputs() {
    let countr = 0;
    let root_notes = new Array();
    let random_amplitudes = new Array();
    let note_checks = new Array();
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let aa = $(this);
        root_notes[countr] = Number(aa.find("input.root_note").val());
        random_amplitudes[countr] = Number(aa.find("input.random_amplitude").val());
        note_checks[countr] = aa
            .find("input.note_check")
            .filter(function() {return this.checked;})
            .map(function() {return this.value;})
            .get()
            .map(Number);
        countr += 1;
    });
    document.getElementById("p_root_notes").innerHTML = root_notes;
    document.getElementById("p_random_amplitudes").innerHTML = random_amplitudes;
    document.getElementById("p_note_checks").innerHTML = note_checks;
    // console.log(root_notes)
    // return note_checks;
}
function rand_root_notes() {
    let items = getAllScaleNotes([0, 7], 36, 84);
    // https://stackoverflow.com/a/5915122
    return items[Math.floor(Math.random() * items.length)];
}
export function set_inputs() {
    let countr = 0;
    let root_notes = new Array();
    let random_amplitudes = new Array();
    // let note_checks = new Array();
    $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
        let aa = $(this);
        let r = rand_root_notes();
        root_notes[countr] = Number(aa.find("input.root_note").val(r));
        random_amplitudes[countr] = Number(aa.find("input.random_amplitude").val(Math.floor(r / 3)));
        // note_checks[countr] = aa
        //     .find("input.note_check")
        //     .filter(function() {return this.checked;})
        //     .map(function() {return this.value;})
        //     .get()
        //     .map(Number);
        countr += 1;
    });
    // document.getElementById("p_root_notes").innerHTML = root_notes;
    // document.getElementById("p_random_amplitudes").innerHTML = random_amplitudes;
    // document.getElementById("p_note_checks").innerHTML = note_checks;
    // console.log(root_notes)
    // return note_checks;
}
