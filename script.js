'use strict';
// Selecting Player Section
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
// Selecting Players Score
const scorePlayerOne = document.getElementById('score--0');
const scorePlayerTwo = document.getElementById('score--1');
//Current Score For The Player
const currentScoreOne = document.getElementById('current--0');
const currentScoreTwo = document.getElementById('current--1');
// Make The SCore is Equal to 0 at the start of the game
scorePlayerOne.textContent = 0;
scorePlayerTwo.textContent = 0;
// Selecting Dice Pic
const dicePic = document.querySelector('.dice');
// Hide the dice pic at the start of the game By adding Class Hidden
dicePic.classList.add('hidden');
//Genrate Random Value for the dice from 1 -> 6
let GenrateRandomValue = function () {
    return Math.trunc(Math.random() * 6) + 1;
};
//Selecting all Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
// Initial Current Score
const currentScore = [0, 0];
//Initial Players Final Score
const score = [0, 0];
score[0] = Number(scorePlayerOne.textContent);
score[1] = Number(scorePlayerTwo.textContent);
// Add Event To Roll Button
btnRoll.addEventListener('click', function () {
    //1-Genrate Random Value from 1 -> 6
    let randomDice = GenrateRandomValue();
    console.log(randomDice);
    //2-Display The Dice Based on the Random Value
    dicePic.classList.remove('hidden');
    dicePic.src = `dice-${randomDice}.png`;
    //3-Check For The Dice
    if (randomDice !== 1) {
        //Add The random Value To Current Score
        if (playerOne.classList.contains('player--active')) {
            currentScore[0] += randomDice;
            currentScoreOne.textContent = currentScore[0];
        } else if (playerTwo.classList.contains('player--active')) {
            currentScore[1] += randomDice;
            currentScoreTwo.textContent = currentScore[1];
        }
    } else {
        //Switch to The next Player
        if (playerOne.classList.contains('player--active')) {
            playerOne.classList.remove('player--active');
            playerTwo.classList.add('player--active');
            currentScore[0] = 0;
            currentScoreOne.textContent = currentScore[0];
        } else if (playerTwo.classList.contains('player--active')) {
            playerOne.classList.add('player--active');
            playerTwo.classList.remove('player--active');
            currentScore[1] = 0;
            currentScoreTwo.textContent = currentScore[1];
        }
    }
    if (score[0] || score[1] >= 100) {
        dicePic.classList.add('hidden');
    }
});
// Add Event To Hold Button
btnHold.addEventListener('click', function () {
    if (playerOne.classList.contains('player--active')) {
        score[0] = score[0] + currentScore[0];
        scorePlayerOne.textContent = score[0];
        if (score[0] >= 100) {
            playerOne.classList.add('player--winner');
            playerOne.classList.remove('player--active');
            playerTwo.classList.remove('player--active');
            dicePic.classList.add('hidden');
        } else {
            playerOne.classList.remove('player--active');
            playerTwo.classList.add('player--active');
        }
        currentScore[0] = 0;
        currentScoreOne.textContent = currentScore[0];
    } else if (playerTwo.classList.contains('player--active')) {
        score[1] = score[1] + currentScore[1];
        scorePlayerTwo.textContent = score[1];
        if (score[1] >= 100) {
            playerTwo.classList.add('player--winner');
            playerOne.classList.remove('player--active');
            playerTwo.classList.remove('player--active');
            dicePic.classList.add('hidden');
        } else {
            playerOne.classList.add('player--active');
            playerTwo.classList.remove('player--active');
        }
        currentScore[1] = 0;
        currentScoreTwo.textContent = currentScore[1];
    }
});
// Add Event To New Game Button
btnNew.addEventListener('click', function () {
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
    score[0] = 0;
    score[1] = 0;
    scorePlayerOne.textContent = score[0];
    scorePlayerTwo.textContent = score[1];
    currentScore[0] = 0;
    currentScore[1] = 0;
    playerOne.classList.remove('player--winner');
    playerTwo.classList.remove('player--winner');
});
