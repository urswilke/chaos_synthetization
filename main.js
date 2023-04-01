import { loadSoundfont, startPresetNote } from 'sfumato';

const sf2 = await loadSoundfont(
  'https://raw.githubusercontent.com/felixroos/felixroos.github.io/main/public/Earthbound_NEW.sf2'
)


function playNote(ctx, midi) {
  const stopHandle = startPresetNote(ctx, sf2.presets[0], midi);
  setTimeout(() => {
    stopHandle((ctx.currentTime || 0));
  }, 500);
}
async function playSequence(notes){
  const ctx = typeof AudioParam !== 'undefined' ? new AudioContext() : null;
  const sleep = m => new Promise(r => setTimeout(r, m));

  for(const midi of notes){
    await sleep(500);
    playNote(ctx, midi)
  }
}
const notes1 = [60, 62, 64, 65, 67, 67, 60];
const notes2 = [64, 65, 67, 67, 60, 60, 62];

function playMultipleSequences(l) {
  for (let i = 0; i < l.length; i++) {
    const seq = l[i];
    playSequence(seq)
  }
}

document.getElementById("play-endless-note-button").addEventListener('click', playMultipleSequences.bind(null, [notes1, notes2]));
