import plotLines from "./plot.js";
import playMultipleSequences from './playNotes.js'

class ScaleNotes {
  constructor(scale_notes, midi_min, midi_max) {
    this.scale_notes = scale_notes;
    this.midi_min = midi_min;
    this.midi_max = midi_max;
  }
  getAllScaleNotes() {
    return getAllScaleNotes(
      this.scale_notes,
      this.midi_min,
      this.midi_max,
    );
  }
}

class RandomMidiCurves {
  constructor(ui_params) {
    this.midi_min = ui_params.midi_min;
    this.midi_max = ui_params.midi_max;
    this.n_curves = ui_params.n_curves;
    this.n_timesteps = ui_params.n_timesteps;
    this.duration = ui_params.duration;
    this.scaleNotes = new ScaleNotes(ui_params.scale_notes, ui_params.midi_min, ui_params.midi_max);
    this.update_curve_data();
  }
  update_curve_data() {
    this.curve_data = genCurveData(
      this.n_curves, 
      this.n_timesteps, 
      this.midi_min, 
      this.midi_max,
      this.scaleNotes
    );
 
  }
  flattenCurveData() {
    return gen_mult_arrays_flat(this.curve_data);
  }
  extractMidiArrays() {
    return genArraysArray(this.curve_data);
  }
  plot() {
    plotLines(
      document.body, 
      this.flattenCurveData(), 
      this.scaleNotes.getAllScaleNotes()
    );
  }
  play() {
    playMultipleSequences(
      this.extractMidiArrays(), 
      this.duration
    )
  }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function genRandomByteSequence(len, midi_min, midi_max) {
    let seq = Array.from({length: len}, () => getRndInteger(midi_min, midi_max));
    return seq;
}
  
function gen_obj_arr(len, midi_min, midi_max) {
    let arr = genRandomByteSequence(len, midi_min, midi_max);
    var x = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        x[i] = {i: i, r: arr[i]};
    }
    return x
}

function gen_mult_arrays(n, len, midi_min, midi_max) {
  let res = new Array(n);
  for (var i = 0; i < n; i++) {
    let x = gen_obj_arr(len, midi_min, midi_max);
    res[i] = [i.toString(), x];
  }
  return res;
}

function genCurveData(n, len, midi_min, midi_max, scale) {
  let noteArrays = gen_mult_arrays(n, len, midi_min, midi_max);
  multAddClosestScaleNotes(noteArrays, scale.getAllScaleNotes());
  return noteArrays;
}

function extractArray(arrayElement) {
  return arrayElement[1].map(a => a.midi);
}
function genArraysArray(noteArrays) {
  return noteArrays.map(extractArray);
}
function gen_mult_arrays_flat(noteArrays) {
  return noteArrays.
    flatMap(([l, noteArrays]) => noteArrays.map(d => ({l, ...d})))
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

function getClosestScaleNote(note, scale) {
  // from here: https://stackoverflow.com/a/35000557
  return scale.reduce((prev, curr) => Math.abs(curr - note) < Math.abs(prev - note) ? curr : prev);
}
function addClosestScaleNotes(notes, scale) {
  // return notes[1].map(obj => ({ ...obj, midi: getClosestScaleNote(scale, obj.r) }));
  for (let i = 0; i < notes[1].length; i++) {
    notes[1][i].midi = getClosestScaleNote(notes[1][i].r, scale)
  }
  return notes;
}
function multAddClosestScaleNotes(noteArrays, scale) {
  for (let i = 0; i < noteArrays.length; i++) {
    noteArrays[i] = addClosestScaleNotes(noteArrays[i], scale);
  }
  return noteArrays;
}
export default RandomMidiCurves;