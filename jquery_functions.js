        $('[name="n_curves_input"]').on('change', function () {
            // Not checking for Invalid input
            if (this.value != '') {
                var val = parseInt(this.value, 10);

                $('#curve_params_tbl tbody').find("tr:gt(0)").remove();
                for (var i = 0; i < val; i++) {
                    // Clone the Template
                    var $cloned = $('.template tbody').clone();
                    // For each Candidate append the template row
                    $('#curve_params_tbl tbody').append($cloned.html());
                }
            }
        })
        // this also fires the function when ready in the beginning:
        // (see here: https://stackoverflow.com/a/17247289)
        .change();

        function get_inputs() {
            var countr = 0;
            var root_notes = new Array();
            var random_amplitudes = new Array();
            var note_checks = new Array();
            $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
                aa = $(this);
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
            let items = getAllScaleNotes([0, 7], 36, 84, rootNote = 60);
            // https://stackoverflow.com/a/5915122
            return items[Math.floor(Math.random() * items.length)];
          }
          function getAllScaleNotes(steps, midi_min, midi_max, rootNote = 60) {
          
          let rootNoteMin = rootNote % 12;
          let i = rootNoteMin;
          let i2 = 0;
          let x = [];
          // from here: https://stackoverflow.com/a/50672288
          let repeatedArray = [].concat(...Array(11).fill(steps));
          let octaveArray = [];
          for (let i = 0; i < repeatedArray.length; i++) {
            let octave = Math.floor(i / steps.length)
            octaveArray[i] = repeatedArray[i] + octave * 12;
            
          }
          return octaveArray
            .filter(num => num >= midi_min & num <= midi_max);
            
          }
          function set_inputs() {
            var countr = 0;
            var root_notes = new Array();
            var random_amplitudes = new Array();
            // var note_checks = new Array();
            $("tr.i_curve_params").not(".template tr.i_curve_params").each(function () {
                aa = $(this);
                let r = rand_root_notes();
                root_notes[countr] = Number(aa.find("input.root_note").val(r));
                random_amplitudes[countr] = Number(aa.find("input.random_amplitude").val(Math.floor(r/3)));
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
          