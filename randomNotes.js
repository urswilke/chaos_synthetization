function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function genRandomByteSequence(len) {
    let seq = Array.from({length: len}, () => getRndInteger(0,127));
    return seq;
}
  
function gen_obj_arr(len) {
    let arr = genRandomByteSequence(len);
    var x = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        x[i] = {i: i, r: arr[i]};
    }
    return x
}

function gen_mult_arrays(n, len) {
  let res = new Array(n);
  for (var i = 0; i < n; i++) {
    let x = gen_obj_arr(len);
    res[i] = [i.toString(), x];
  }
  return res;
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

function getChecked() {
  let ids = $("fieldset :checkbox")
      .filter(function() {return this.checked;})
      .map(function() {return this.value;})
      .get()
      .map(Number);
  document.getElementById("pScaleNotes").innerHTML = ids
  return ids;
}

function getAllScaleNotes(steps, rootNote = 60) {

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
  return octaveArray;
    
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
export { gen_mult_arrays, gen_mult_arrays_flat, getChecked, getAllScaleNotes, genArraysArray, multAddClosestScaleNotes };