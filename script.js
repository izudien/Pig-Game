'use strict';

// Selecting ELements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// set score to 0;
score0El.textContent = 0;
score1El.textContent = 0;
// set dice to hidden
diceEL.classList.add('hidden');
let scores, currentScore, activePlayer, isPlaying;

const init = function () {
    scores = [0, 0];
    // current score 
    currentScore = 0;
    // selected/ active player
    activePlayer = 0;
    // is playing 
    isPlaying = true;

    // set score to 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    // set dice to hidden
    diceEL.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // 3.2. jika sama 1, tukar player
    // jika player sebelum 0 / maka tukar 1/jika 1 maka 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // console.log(activePlayer, currentScore);
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (isPlaying) {
        // 1. Generate a random dice roll
        let dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;
        // 3. Check a rolled  1 : if true, switch to next player
        //  3.1. check bukan  dice roll = 1 , teruskan roll
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // console.log(activePlayer, currentScore);
        } else {
            // switch to next player
            switchPlayer();
        }
    }
})

// hold score
btnHold.addEventListener('click', function () {
    if (isPlaying) {
        // 1. add current score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2.check if current score >=100 will win 
        if (scores[activePlayer] >= 100) {
            // finish the game
            diceEL.classList.add('hidden');
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // switch to next player
            switchPlayer();
        }
    }
})


// new game/reset
btnNew.addEventListener('click', init);