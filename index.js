const header2Block = document.querySelector("#header2");
const bestScoreBlock = document.querySelector("#bestScore");
const submitBlock = document.querySelector("#submit");
const guidanceBlock = document.querySelector("#guidance");
const guidanceBlock2 = document.querySelector("#guidance2");
const guidanceBlock3 = document.querySelector("#guidance3");
const guidanceBlock4 = document.querySelector("#guidance4");
const guessBlock = document.querySelector("#guess");
const restartBlock = document.querySelector("#restart");
const min = 1;
const max = 100;
let num, attempts, bestScore, gameOver, guesses, lowBound, highBound, middle;

function startGame() {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    attempts = 0;
    gameOver = false;
    guesses = [];
    lowBound = [min];
    highBound = [max];
    middle = Math.floor(((Math.max(...lowBound)) + Math.min(...highBound)) /2);
    console.log(num);
    console.log("i love amanda♥️");
    header2Block.innerHTML = "guess the number between " + lowBound + " and " + highBound.toLocaleString();
    guessBlock.value = "";
    guidanceBlock.innerHTML = "";
    guidanceBlock2.innerHTML = "";
    guidanceBlock3.innerHTML = "";
    guidanceBlock4.innerHTML = "";
    submitBlock.style.display = "inherit";
    restartBlock.style.display = "none";
}

function guessingGame() {
    let guess = Number(guessBlock.value);

    if (gameOver) {
        return;
    }

    if (guess > max) {
        attempts++;
        guidanceBlock.innerHTML = "number of guesses: " + attempts;
        guidanceBlock2.innerHTML = "You're guess is too high! Please select a number between " + min + " and " + max + ".";
        updateGuessArray(guess);
    }
    if (guess < min) {
        attempts++;
        guidanceBlock.innerHTML = "number of guesses: " + attempts;
        guidanceBlock2.innerHTML = "You're guess is too low! Please select a number between " + min + " and " + max + ".";
        updateGuessArray(guess);
    }
    if (guess >= min && guess <= max) {
        if (guess > num) {
            attempts++;
            guidanceBlock.innerHTML = "number of guesses: " + attempts;
            guidanceBlock2.innerHTML = guess + " is too high. 👇🏼";
            updateGuessArray(guess);
            highBound.push(guess);
            middle = Math.floor(((Math.max(...lowBound)) + Math.min(...highBound)) /2);
            guidanceBlock4.innerHTML = "between "+ Math.max(...lowBound) +" and " + Math.min(...highBound) + " (mid point: "+middle+")";
        } else if (guess < num) {
            attempts++;
            guidanceBlock.innerHTML = "number of guesses: " + attempts;
            guidanceBlock2.innerHTML = guess + " is too low. 👆🏼";
            updateGuessArray(guess);
            lowBound.push(guess);
            middle = Math.floor(((Math.max(...lowBound)) + Math.min(...highBound)) /2);
            guidanceBlock4.innerHTML = "between "+ Math.max(...lowBound) +" and " + Math.min(...highBound) + " (mid point: "+middle+")";
            //middle = (max - guess) / 2 + guess;
            //guidanceBlock4.innerHTML = "between "+ guess +" and " + max + " (mid point: "+middle+")";
        } else if (guess === num) {
            attempts++;
            guidanceBlock.innerHTML = "number of guesses: " + attempts;
            guidanceBlock2.innerHTML = "You did it! it took you " + attempts + " attempts to guess the number correctly";
            guidanceBlock4.innerHTML = "";
            updateGuessArray(guess);
            updateScore();
            submitBlock.style.display = "none";
            restartBlock.style.display = "inherit";
            gameOver = true;
        }
    }
}

function updateGuessArray(guess) {
    guesses.push(guess);
    guesses.sort((a, b) => a - b);
    guidanceBlock3.innerHTML = "your guesses: " + guesses.join(", ");
}

function updateScore() {
    if (attempts < bestScore || bestScore === undefined) {
        bestScore = attempts;
    }
    bestScoreBlock.innerHTML = "best score: " + bestScore;
}




startGame();

submitBlock.onclick = guessingGame;
guessBlock.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitBlock.click(); // Simulate a button click
    }
});

restartBlock.onclick = startGame;