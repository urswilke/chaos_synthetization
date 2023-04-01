import { loadSoundfont, startPresetNote } from 'sfumato';

const sf2 = await loadSoundfont(
  'https://raw.githubusercontent.com/felixroos/felixroos.github.io/main/public/Earthbound_NEW.sf2'
)

function playEndlessNote() {
  const ctx = typeof AudioParam !== 'undefined' ? new AudioContext() : null;
  let preset = 0;
  let midi = 60; 
  let time = 1;
  startPresetNote(ctx, sf2.presets[0], midi, time)
}
document.getElementById("play-endless-note-button").addEventListener('click', playEndlessNote);
