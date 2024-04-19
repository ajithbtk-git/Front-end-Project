// List of words for the game
const words = {
    en: ["apple", "banana", "cherry", "orange", "pear", "grape", "melon"],
    es: ["manzana", "plátano", "cereza", "naranja", "pera", "uva", "melón"]
};

let attemptsLeft = 5; // Number of attempts allowed

// Select a random word from the specified language
function chooseWord(language) {
    const wordList = words[language];
    return wordList[Math.floor(Math.random() * wordList.length)];
}

// Initialize the game
function initGame() {
    const language = prompt("Select language: 'en' for English, 'es' for Spanish");
    const targetWord = chooseWord(language.toLowerCase());
    sessionStorage.setItem('targetWord', targetWord);

    console.log(`The target word is: ${targetWord}`);

    const wordDisplay = document.getElementById('word-display');
    for (let i = 0; i < targetWord.length; i++) {
        const placeholder = document.createElement('span');
        placeholder.className = 'placeholder';
        wordDisplay.appendChild(placeholder);
    }

    document.addEventListener('keydown', handleKeyPress);
}

// Handle key press events
function handleKeyPress(event) {
    if (attemptsLeft === 0) {
        alert("Game Over!");
        window.location.href = "wordle_game.html";
    }

    const key = event.key.toLowerCase();
    const targetWord = sessionStorage.getItem('targetWord');
    const placeholders = document.querySelectorAll('.placeholder');

    let updated = false;

    placeholders.forEach((placeholder, index) => {
        if (placeholder.textContent === '' && attemptsLeft > 0) {
            const correctLetter = targetWord[index];

            if (key === correctLetter) {
                placeholder.textContent = key.toUpperCase();
                placeholder.classList.add('correct');
                updated = true;
            }
        }
    });

    if (!updated && attemptsLeft > 0) {
        attemptsLeft--;
        const feedbackText = document.getElementById('feedback');
        feedbackText.textContent = `Incorrect guess! ${attemptsLeft} attempts left.`;
    }

    checkGameStatus();
}

// Check if the game is won or lost
function checkGameStatus() {
    const placeholders = document.querySelectorAll('.placeholder');
    const allFilled = Array.from(placeholders).every(placeholder => placeholder.textContent !== '');

    if (allFilled) {
        const guessedWord = Array.from(placeholders).map(placeholder => placeholder.textContent).join('').toLowerCase();
        const targetWord = sessionStorage.getItem('targetWord');
        const feedbackText = document.getElementById('feedback');

        if (guessedWord === targetWord) {
            feedbackText.textContent = "Correct! You guessed the word.";
        } else {
            feedbackText.textContent = "Incorrect guess. Try again!";
        }

        document.removeEventListener('keydown', handleKeyPress);
    }
}

// Start the game
document.addEventListener('DOMContentLoaded', initGame);
