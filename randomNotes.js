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

function gen_mult_arrays_flat(n, len) {
  let mult_arr = gen_mult_arrays(n, len)
  return mult_arr.
    flatMap(([l, data]) => data.map(d => ({l, ...d})))
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
export {gen_mult_arrays_flat, getChecked, getAllScaleNotes};