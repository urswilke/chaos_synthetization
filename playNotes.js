import { loadSoundfont, startPresetNote } from 'sfumato';

const sf2 = await loadSoundfont(
  // 'https://raw.githubusercontent.com/surikov/webaudiofontdata/master/sf2/Acoustic%20Guitar.sf2'
  // 'https://raw.githubusercontent.com/felixroos/felixroos.github.io/main/public/Earthbound_NEW.sf2'
  'https://raw.githubusercontent.com/urswilke/chaos_synthetization/main/public/052_Florestan_Ahh_Choir.sf2'
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

  for(const midi of notes){
    await sleep(duration);
    playNote(ctx, midi, duration)
  }
}

export default function playMultipleSequences(l, duration) {
  for (let i = 0; i < l.length; i++) {
    playSequence(l[i], duration)
  }
}
