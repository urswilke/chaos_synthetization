import playMultipleSequences from './playNotes.js'
const notes1 = [60, 62, 64, 65, 67, 67, 60];
const notes2 = [64, 65, 67, 67, 60, 60, 62];
const duration = 500;
document.getElementById("play-multiple-sequences").addEventListener('click', playMultipleSequences.bind(null, [notes1, notes2], duration));
