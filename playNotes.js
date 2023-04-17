import { startPresetNote } from 'sfumato';



function playNote(ctx, midi, duration, sf2) {
  const stopHandle = startPresetNote(ctx, sf2.presets[0], midi);
  setTimeout(() => {
    stopHandle((ctx.currentTime || 0));
  }, duration);
}
async function playSequence(notes, duration, sf2){
  const ctx = typeof AudioParam !== 'undefined' ? new AudioContext() : null;
  const sleep = m => new Promise(r => setTimeout(r, m));

  for(const midi of notes){
    playNote(ctx, midi, duration, sf2)
    await sleep(duration);
  }
}

export default async function playMultipleSequences(l, sf2) {
  let promises = new Array(l.length);
  for (let i = 0; i < l.length; i++) {
    promises[i] = playSequence(l[i].midi_curve, l[i].duration * l[i].note_length, sf2);
  }
  return promises;
}
