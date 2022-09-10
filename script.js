'use strict';
// chọn Element
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

// code logic game
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let scores, currentScore, activePlayer, playing;

let init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
};
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// tung xúc xắc
btnRoll.addEventListener('click', function () {
  if (playing) {
    // tung xúc xác ngẫu nhiên
    let dice = Math.trunc(Math.random() * 6) + 1;

    //   hiển thị hình ảnh
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.jpg`;
    //   in điểm nếu điểm = 1 thì đổi lượt
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // winer
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// new game
btnNew.addEventListener('click', function () {
  init();
});
