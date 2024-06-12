const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;

var squareWidth = 20;
var squareHeight = 20;
var squareX = 190;
var squareY = 190;

function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  frameRate(20);
}

function draw() {
  background(50, 50, 50);

  update();

  // draw your game objects
  rect(squareX, squareY, squareWidth, squareHeight);
}

function update() {
  // change your game every frame
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    squareY = squareY - 5;
  } else if (keyCode === DOWN_ARROW) {
    squareY = squareY + 5;
  } else if (keyCode === RIGHT_ARROW) {
    squareX = squareX + 5;
  } else if (keyCode === LEFT_ARROW) {
    squareX = squareX - 5;
  }
}