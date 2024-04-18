// Define the secret word
const secretWord = "apple";
let remainingAttempts = 5;

// Initialize the word display
let wordDisplay = [];
for (let i = 0; i < secretWord.length; i++) {
    wordDisplay.push('_');
}
document.getElementById('word-container').textContent = wordDisplay.join(' ');

// Function to check the guessed word
function checkGuess() {
    const guessInput = document.getElementById('guess').value.toLowerCase();

    if (guessInput.length !== secretWord.length) {
        alert('Please enter a ' + secretWord.length + '-letter word.');
        return;
    }

    remainingAttempts--;

    // Check each letter
    let feedback = '';
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guessInput[i]) {
            wordDisplay[i] = secretWord[i];
            feedback += '<span style="color: green">' + guessInput[i] + '</span>';
        } else if (secretWord.includes(guessInput[i])) {
            feedback += '<span style="color: red">' + guessInput[i] + '</span>';
        } else {
            feedback += guessInput[i];
        }
    }

    // Update the displayed word
    document.getElementById('word-container').innerHTML = wordDisplay.join(' ');

    // Display feedback
    document.getElementById('feedback').innerHTML = feedback;

    // Check if the word is guessed correctly
    if (wordDisplay.join('') === secretWord) {
        document.getElementById('feedback').innerHTML = '<span style="color: green">Congratulations! You guessed the word!</span>';
    } else if (remainingAttempts === 0) {
        document.getElementById('feedback').innerHTML = '<span style="color: red">Game over! The word was "' + secretWord + '".</span>';
    }

    document.getElementById('guess').value = '';
}
