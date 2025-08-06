const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-card");
const cardContainer = document.getElementById("cards");
const headerEl = document.getElementById("header");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");
const remainingCards = document.getElementById("remaining-cards");
let deckId;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
    });
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", function () {
  console.log("clicked");

  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);

      cardContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
      `;

      cardContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />
      `;

      const winnerCard = determineCardWinner(data.cards[0], data.cards[1]);
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
    console.log("Computer Wins!");
  } else if (cardValue1 < cardValue2) {
    console.log("You Wins!");
  } else {
    console.log("It's a tie!!");
  }
}
