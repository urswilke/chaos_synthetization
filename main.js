import { loadSoundfont, startPresetNote } from 'sfumato';

const sf2 = await loadSoundfont(
  'https://raw.githubusercontent.com/felixroos/felixroos.github.io/main/public/Earthbound_NEW.sf2'
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

function playMultipleSequences(l, duration) {
  for (let i = 0; i < l.length; i++) {
    playSequence(l[i], duration)
  }
}

const notes1 = [60, 62, 64, 65, 67, 67, 60];
const notes2 = [64, 65, 67, 67, 60, 60, 62];
const duration = 500;
document.getElementById("play-multiple-sequences").addEventListener('click', playMultipleSequences.bind(null, [notes1, notes2], duration));
