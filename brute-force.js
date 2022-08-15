const displayWords = document.getElementsByClassName('displayWords')[0];

let words = [];

function remove(string, ...words) {
  let newString = string;
  for (const word of words) {
    newString = newString.replace(word, '');
  }
  return newString;
}

function generateWords(length, letters, ...takenLetters) {
  const level = length - 1;

  const remaining = remove(letters, ...takenLetters);

  if (!remaining.length) {
    words.push(takenLetters.join(''));
    return;
  }

  for (const i of remaining) {
    if (level === -1) {
      words.push(takenLetters.join(''));
      return;
    }
    generateWords(level, letters, ...takenLetters, i);
  }
}

document.getElementById('goBtn').addEventListener('click', () => {
  const letters = document.getElementById('letterInput').value;
  const length = parseInt(document.getElementById('lengthInput').value);

  words.length = 0;
  generateWords(length, letters);
  words = [...new Set(words)]; // remove duplicates from duplicate letters (two Es or whatever)
  words = words.filter(word => dictionary.includes(word.toUpperCase()));

  displayWords.innerText = words.join('\n');
}, false);

document.getElementById('regex').addEventListener('input', e => {
  const regex = new RegExp(e.target.value);
  displayWords.innerText = words.filter(word => regex.test(word)).join('\n');
}, false);
