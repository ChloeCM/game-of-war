const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-card");
const cardContainer = document.getElementById("cards");
const headerEl = document.getElementById("header");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");
const remainingCards = document.getElementById("remaining-cards");
let deckId;
let computerScore = 0;
let myScore = 0;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
      remainingCards.textContent = `Remaining Cards: ${data.remaining}`;
    });
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", function () {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingCards.textContent = `Remaining Cards: ${data.remaining}`;
      cardContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
      `;

      cardContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />
      `;

      const winnerCard = determineCardWinner(data.cards[0], data.cards[1]);
      headerEl.textContent = winnerCard;

      if (data.remaining === 0) {
        drawCardBtn.disabled = true;

        if (computerScore > myScore) {
          header.textContent = `Computer Wins the Game!!`;
        } else if (computerScore < myScore) {
          header.textContent = `You Win the Game!!`;
        } else {
          header.textContent = `It's a tie!!`;
        }
      }
    });
});

function determineCardWinner(card1, card2) {
  const cardOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  const cardValue1 = cardOptions.indexOf(card1.value);
  const cardValue2 = cardOptions.indexOf(card2.value);

  if (cardValue1 > cardValue2) {
    computerScore++;
    computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    return `Computer Wins!`;
  } else if (cardValue1 < cardValue2) {
    myScore++;
    myScoreEl.textContent = `My Score: ${myScore}`;
    return `You Win!`;
  } else {
    return `War!!`;
  }
}
