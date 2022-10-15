const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const againBtn = document.querySelector("#again");
const colors = [
  "#EB4779",
  "#40253A",
  "#019DB5",
  "#AA8150",
  "white",
  "#56686E",
  "#5A6756",
  "#EB5E35",
];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

againBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[3].classList.add("down");
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Score:<span class='primary'>${score}</span></span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomnumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomnumber(0, width - size);
  const y = getRandomnumber(0, height - size);
  const color = getrandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 10px ${color}`;

  board.append(circle);
}

function getRandomnumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getrandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
