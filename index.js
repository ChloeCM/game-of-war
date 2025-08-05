const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-card");
const cardContainer = document.getElementById("cards");
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
    });
});
