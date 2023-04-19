import { startPresetNote } from 'sfumato';



function playNote(ctx, midi, duration, preset) {
  const stopHandle = startPresetNote(ctx, preset, midi);
  setTimeout(() => {
    stopHandle((ctx.currentTime || 0));
  }, duration);
}
async function playSequence(notes, duration, preset){
  const ctx = typeof AudioParam !== 'undefined' ? new AudioContext() : null;
  const sleep = m => new Promise(r => setTimeout(r, m));
  
  for(const midi of notes){
    playNote(ctx, midi, duration, preset)
    await sleep(duration);
  }
}

export default async function playMultipleSequences(l, sf2) {
  let promises = new Array(l.length);
  for (let i = 0; i < l.length; i++) {
    let preset = sf2.presets[l[i].preset];
    promises[i] = playSequence(l[i].midi_curve, l[i].duration * l[i].note_length, preset);
  }
  return promises;
}
