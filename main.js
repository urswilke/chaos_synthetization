import { loadSoundfont, startPresetNote } from 'sfumato';

const sf2 = await loadSoundfont(
  'https://raw.githubusercontent.com/felixroos/felixroos.github.io/main/public/Earthbound_NEW.sf2'
)

function playEndlessNote() {
  const ctx = typeof AudioParam !== 'undefined' ? new AudioContext() : null;
  let midi = 60; 
  let time = 0;
  const stopHandle = startPresetNote(ctx, sf2.presets[0], midi);
  setTimeout(() => {
    stopHandle((ctx?.currentTime || 0) + 2);
  }, 1000);
}
function playNote(ctx, midi) {
  const stopHandle = startPresetNote(ctx, sf2.presets[0], midi);
  setTimeout(() => {
    stopHandle((ctx.currentTime || 0));
  }, 500);
}
const notes = [60, 62, 64, 65, 67, 67, 60];
async function playSequence(){
  const ctx = typeof AudioParam !== 'undefined' ? new AudioContext() : null;
  const sleep = m => new Promise(r => setTimeout(r, m));

  for(const midi of notes){
    await sleep(500);
    playNote(ctx, midi)
  }
}


document.getElementById("play-endless-note-button").addEventListener('click', playSequence.bind(null, notes));
