const grid = document.querySelector(".grid-container");
let squares = Array.from(document.querySelectorAll(".grid-items"));
let count = 0;
const width = 10;
/*
// let next_squares = Array.from(document.querySelectorAll(".next-grid-items"));
for (i = 0; i < 24; i++) {
  next_squares[i].textContent = i;
}
// Upcoming shapes
// let next_width = 6;
let next_width = 0;
const next_lShape = [1, next_width + 1, next_width * 2 + 1, next_width * 2 + 2];

const next_iShape = [1, next_width + 1, next_width * 2 + 1, next_width * 3 + 1];

const next_zShape = [0, next_width, next_width + 1, next_width * 2 + 1];

const next_tShape = [
  next_width,
  next_width + 1,
  next_width + 2,
  next_width * 2 + 1,
];

const next_oShape = [0, 1, next_width, next_width + 1];
const nextAllShape = [
  next_lShape,
  next_iShape,
  next_zShape,
  next_tShape,
  next_oShape,
];
*/
// Making L shape
const lShape = [
  // [0, width, width * 2, width * 2 + 1],

  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width, width + 1, width + 2, width * 2],
  [0, 1, width + 1, width * 2 + 1],
  [width + 2, width * 2 + 2, width * 2 + 1, width * 2],
  // [width, width * 2, width * 2 + 1, width * 2 + 2],
  // [width, width + 1, width + 2, width * 2 + 2],
];

// Making I shape
const iShape = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

// Making Z shape
const zShape = [
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  // [width * 2, width * 2 + 1, width + 1, width + 2],
  // [width * 2, width * 2 + 1, width + 1, width + 2],
];

// Making T shape
const tShape = [
  [0, 1, 2, width + 1],
  [1, width + 1, width * 2 + 1, width],
  [width, width + 1, width + 2, 1],
  [0, width, width * 2, width + 1],

  // [width, width + 1, width + 2, width * 2 + 0],
  // [0, width + 1, width * 2 + 1, width],
  // [width, width + 1, width + 2, 0],
  // [0, width + 1, width * 2 + 1, width + 2],
];

// Making O shape
const oShape = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

// Setting position, rotation and shape

const allShape = [lShape, iShape, zShape, tShape, oShape];
const color = ["red", "green", "blue", "yellow", "pink"];
let randomShape = Math.floor(Math.random() * allShape.length);

let currentPosition = 4;
let currentRotation = 0;
let currentShape = allShape[randomShape][currentRotation];

// Draw the shape
function drawShape() {
  currentShape.forEach((index) => {
    squares[currentPosition + index].style.background = color[randomShape];
  });
}
drawShape();

// Erase the shape
function eraseShape() {
  currentShape.forEach((index) => {
    squares[currentPosition + index].style.background = "";
  });
}

// Move the shape down
function moveDown() {
  eraseShape();
  currentPosition += width;
  drawShape();
  stop();
}
var timer = setInterval(moveDown, 300); // call moveDown() after 0.3s

// Stop the shape
function stop() {
  if (
    currentShape.some((index) =>
      squares[currentPosition + index + width].classList.contains("freeze")
    )
  ) {
    currentShape.forEach((index) =>
      squares[currentPosition + index].classList.add("freeze")
    );

    // Start new shape falling
    randomShape = Math.floor(Math.random() * allShape.length);
    currentRotation = 0;
    currentShape = allShape[randomShape][currentRotation];
    currentPosition = 4;

    drawShape();
    addScore();
    gameOver();
  }
}

// Control the game
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  } else if (e.keyCode === 32) {
    rotate();
  }
}
window.addEventListener("keydown", control);

// To move left
function moveLeft() {
  eraseShape();

  let leftBlockage = currentShape.some(
    (index) => (index + currentPosition) % width === 0
  );

  let Blockage = currentShape.some((index) =>
    squares[index + currentPosition - 1].classList.contains("freeze")
  );

  if (!leftBlockage && !Blockage) {
    // eraseShape();
    currentPosition--;
  }
  drawShape();
}

// To move right
function moveRight() {
  eraseShape();
  let rightBlockage = currentShape.some(
    (index) => (index + currentPosition + 1) % width === 0
  );

  let Blockage = currentShape.some((index) =>
    squares[index + currentPosition + 1].classList.contains("freeze")
  );

  if (!rightBlockage && !Blockage) {
    currentPosition++;
  }

  drawShape();
}

// To rotate
function rotate() {
  eraseShape();
  currentRotation++;
  if (currentRotation === 4) {
    currentRotation = 0;
  }
  currentShape = allShape[randomShape][currentRotation];
  drawShape();
}

let score = document.querySelector(".score");

// Adding pause and play functionality

let btnPause = document.querySelector(".pause");
btnPause.addEventListener("click", pause);

function pause() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    drawShape();
    timer = setInterval(moveDown, 300);
  }
}

// Adding game over functionality
const finalScore = document.querySelector("#final-score");
function gameOver() {
  if (
    currentShape.some((index) =>
      squares[currentPosition + index].classList.contains("freeze")
    )
  ) {
    clearInterval(timer);
    finalScore.textContent = score.textContent;
    document.querySelector(".game-over-overlay").classList.remove("hidden");
    document.querySelector(".game-over-window").classList.remove("hidden");
  }
}

// Add score
function addScore() {
  for (i = 0; i < 199; i += width) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    // console.log(row);
    if (row.every((index) => squares[index].classList.contains("freeze"))) {
      count += 10;
      score.textContent = count;
      row.forEach((index) => {
        squares[index].classList.remove("freeze");
        squares[index].style.background = "";
      });
      const squareRemoved = squares.splice(i, width);
      squares = squareRemoved.concat(squares);
      squares.forEach((square) => grid.appendChild(square));
    }
  }
}

// Implementing quit mechanism

let quit = document.querySelector(".quit");
quit.addEventListener("click", quitGame);

function quitGame() {
  /*
  document.querySelector(".quit-overlay").classList.remove("hidden");
  document.querySelector(".quit-window").classList.remove("hidden");
  */
  let answer = confirm("Do you want to close?");
  if (answer) {
    // prompt("selected yes");
    close();
  }
}

function hideQuitWindow() {
  /* document.querySelector(".quit-overlay").classList.add("hidden");
  document.querySelector(".quit-window").classList.add("hidden");
  */
  close();
}

function closeGame() {
  // Window.close();
}
document.querySelector(".ans-yes").addEventListener("click", closeGame);
document.querySelector(".ans-no").addEventListener("click", hideQuitWindow);
// Adding Esc key press event handler
function hideModal(e) {
  if (e.keyCode === 27) if (!modal.classList.contains("hidden")) hideModal();
}
window.addEventListener("keydown", hideModal);

// // Styling Pause button
// document.querySelector(".pause-btn").addEventListener("click", () => {
//   document.querySelector(".pause-btn").classList.toggle("pause-style");
// });
