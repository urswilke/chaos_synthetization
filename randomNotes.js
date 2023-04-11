import perlin from 'perlin-noise' ;

export function gen_random_curves_array(ui_params) {
  let tbl = ui_params.ui_curve_params;
  const n_curves = ui_params.n_curves;
  let res = new Array(n_curves);
  for (let i_curve = 0; i_curve < n_curves; i_curve++) {
    let element = {
      scale_notes: tbl.note_checks[i_curve],
      random_amplitude: tbl.random_amplitudes[i_curve],
      root_note: tbl.root_notes[i_curve],
      n_timesteps: ui_params.n_timesteps,
      midi_min: ui_params.midi_min,
      midi_max: ui_params.midi_max,
    };
    element.raw_curve = perlin.generatePerlinNoise(1, element.n_timesteps).map((x) => (x - 0.5) * 2);
    res[i_curve] = element;
  }
  return res;
}

export function gen_midi_curves_array(random_curve_data) {
  const n_curves = random_curve_data.length;
  let res = new Array(n_curves);
  for (let i_curve = 0; i_curve < n_curves; i_curve++) {
    let element = random_curve_data[i_curve]
    element.midi_curve = element.raw_curve
      .map((x) => element.root_note + element.random_amplitude * x)
      .map((x) => getClosestScaleNote(
        x, 
        getAllScaleNotes(
          element.scale_notes,
          element.midi_min,
          element.midi_max
        )
      ));
    res[i_curve] = element;
  }
  return res;
}

export function getAllScaleNotes(steps, midi_min, midi_max, rootNote = 60) {

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

function getClosestScaleNote(note, scale) {
  // from here: https://stackoverflow.com/a/35000557
  return scale.reduce((prev, curr) => Math.abs(curr - note) < Math.abs(prev - note) ? curr : prev);
}


export function create_plot_data(x) {
  let elements = new Array(x.length);
  for (let l = 0; l < x.length; l++) {
    elements[l] = x[l].midi_curve
      .map(function(el, i) {
        return {
          l,
          i,
          midi: el
        }
    });
  }
  return elements.flat();
}
