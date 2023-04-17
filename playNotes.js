import { loadSoundfont, startPresetNote } from 'sfumato';

const sf2 = await loadSoundfont(
  // 'https://raw.githubusercontent.com/surikov/webaudiofontdata/master/sf2/Acoustic%20Guitar.sf2'
  'https://raw.githubusercontent.com/felixroos/felixroos.github.io/main/public/Earthbound_NEW.sf2'
  // 'https://raw.githubusercontent.com/urswilke/chaos_synthetization/main/public/052_Florestan_Ahh_Choir.sf2'
)


function playNote(ctx, midi, duration) {
  const stopHandle = startPresetNote(ctx, sf2.presets[0], midi);
  setTimeout(() => {
    stopHandle((ctx.currentTime || 0));
  }, duration);
}
async function playSequence(notes, duration){
  const ctx = typeof AudioParam !== 'undefined' ? new AudioContext() : null;
  const sleep = m => new Promise(r => setTimeout(r, m));
  for (let i = 0; i < notes.length - 1; i++) {
    const note = notes[i]; 
    playNote(ctx, note.midi, duration)
    await sleep(duration);
  }
}

export default async function playMultipleSequences(l) {
  let promises = new Array(l.length);
  for (let i = 0; i < l.length; i++) {
    promises[i] = playSequence(l[i].midi_curve, l[i].duration * l[i].note_length);
  }
  return promises;
}
