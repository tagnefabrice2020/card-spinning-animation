const currentIndicatorIndexContainer = document.querySelector(
  ".current--index__indicator"
);
const cardSection = document.querySelector("#card--section");
const cardNames = document.querySelectorAll(".card__names h3");
let originalCardPositions = []; // Store original card positions
let originalCardTransforms = [];

let circleElements;
currentIndex = 0;

// Function to store original card positions
function storeOriginalCardPositions() {
  const cards = document.querySelectorAll(".cards:not(.rotation--mode) img");
  originalCardPositions = Array.from(cards).map((card) => ({
    top: card.offsetTop,
    left: card.offsetLeft,
  }));
  originalCardTransforms = Array.from(cards).map((card) => ({
    transform: getTransformValue(card),
  }));

  console.log(originalCardPositions);
}

// Helper function to get the computed transform value
function getTransformValue(element) {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.getPropertyValue("transform");
}

// Function to reset card positions to their original state
function resetCardPositions() {
  const cards = document.querySelectorAll(".cards img");
  console.log(cards);
  cards.forEach((card, index) => {
    card.style.top = originalCardPositions[index].top + "px";
    card.style.left = originalCardPositions[index].left + "px";
    card.style.transform = originalCardTransforms[index].transform;
    card.style.transformOrigin = "bottom";
  });
}4

function rotate() {
  let angle = 360 - 90;
  let dangle = 360 / circleElements.length;
  currentIndicatorIndexContainer.innerHTML = currentIndex + 1;

  for (let i = 0; i < circleElements.length; i++) {
    let circle = circleElements[i];
    angle += dangle;

    let rotationAngle = angle - currentIndex * dangle;
    if (rotationAngle < 0) {
      rotationAngle += 360; // Ensure positive rotation angle
    }

    circle.style.transform = `rotate(${rotationAngle}deg) translateX(${300}px) rotate(-${90}deg)`;
    circle.style.transformOrigin = "top";
  }
}

function translateNames(operator) {
  const translation =
    operator === "+" ? currentIndex * 100 : currentIndex * 100;
  cardNames.forEach((card) => {
    card.style.transform = `translateY(-${translation}%)`;
  });
}

document.getElementById("prev").addEventListener("click", function () {
  currentIndex =
    currentIndex === 0 ? circleElements.length - 1 : currentIndex - 1;
  translateNames("-");
  rotate();
});

document.getElementById("next").addEventListener("click", function () {
  currentIndex =
    currentIndex === circleElements.length - 1 ? 0 : currentIndex + 1;
  translateNames("+");

  rotate();
});

document
  .querySelector(".btn--lancer__le__jeux")
  .addEventListener("click", function () {
    cardSection.classList.add("rotation--mode");
    circleElements = document.querySelectorAll(".rotation--mode .cards img");
    storeOriginalCardPositions ();
    rotate();
  });

document.querySelector(".close").addEventListener("click", () => {
  console.log("clicked");
  resetCardPositions();
  cardSection.classList.remove("rotation--mode");
});
