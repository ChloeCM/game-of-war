const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-card");
const cardContainer = document.getElementById("cards");
const headerEl = document.getElementById("header");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");
const remainingCards = document.getElementById("remaining-cards");
const endResultEl = document.getElementById("end-result");
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
      drawCardBtn.disabled = false;

      endResultEl.style.display = "none";
      computerScore = 0;
      myScore = 0;
      headerEl.textContent = "Starting Game of War...";
      myScoreEl.textContent = "Computer Score: 0";
      computerScoreEl.textContent = "My Score: 0";
      computerScoreEl.style.display = "block";
      myScoreEl.style.display = "block";
      cardContainer.children[0].innerHTML = "";
      cardContainer.children[1].innerHTML = "";
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

        optionsAfterFinishing();
        // computerScoreEl.textContent = ``;
        // myScoreEl.textContent = ``;
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

function optionsAfterFinishing() {
  if (computerScore > myScore) {
    headerEl.textContent = `😔 Computer Wins the Game!! 😔`;
  } else if (computerScore < myScore) {
    headerEl.textContent = `🏆 You Win the Game!! 🏆`;
  } else {
    headerEl.textContent = `💀 It's a tie!! 💀`;
  }

  computerScoreEl.style.display = "none";
  myScoreEl.style.display = "none";

  endResultEl.style.display = "block";
  endResultEl.innerHTML = `
    <h1>${headerEl.textContent}</h1>
    <br />
    <h2>Computer Score: ${computerScore}</h2>
    <h2>My Score: ${myScore}</h2>
    <br />
    <p>Please click the <i>New Deck, Please</i> button above to start a new game</p>

  `;
}
