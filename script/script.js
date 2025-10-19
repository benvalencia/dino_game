import Dino from "./dino.js";
import Ground from "./Ground.js";

const dino_game = document.getElementById("dino_game");
const context = dino_game.getContext("2d");

const GAME_SPEED_START = .75;
const GAME_SPEED_INCREMENT = .00001;

const WORLD_WIDTH = 800;
const WORLD_HEIGHT = 200;
const DINO_WIDTH = 88 / 1.5;
const DINO_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = WORLD_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = .5;

let dino = null;
let ground = null;
let scaleRatio = null;
let previousTime = null;  
let gameSpeed = GAME_SPEED_START;

function createSprites() {
  const dinoWidthInGame = DINO_WIDTH * scaleRatio;
  const dinoHeightInGame = DINO_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;
  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;
  
  dino = new Dino(
    context,
    dinoWidthInGame,
    dinoHeightInGame,
    minJumpHeightInGame,
    maxJumpHeightInGame,
    scaleRatio
  );
  
  ground = new Ground(
    context,
    groundWidthInGame,
    groundHeightInGame,
    GROUND_AND_CACTUS_SPEED,
    scaleRatio
  )
}

function setScreen() {
  scaleRatio = getScaleRatio();
  
  dino_game.width = WORLD_WIDTH * scaleRatio;
  dino_game.height = WORLD_HEIGHT * scaleRatio;
  createSprites()
}

setScreen()

window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio() {
  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );
  
  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  if (screenWidth / screenHeight < WORLD_WIDTH / WORLD_HEIGHT ) {
    return screenWidth / WORLD_WIDTH;
  } else {
    return screenHeight / WORLD_HEIGHT;
  }
  
}

function clearWorld() { 
  context.fillStyle = "#fff";
  context.fillRect(0, 0, dino_game.width, dino_game.height);
}

function worldLoop(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(worldLoop)
    return;
  }
  const frameRate = currentTime - previousTime;
  previousTime = currentTime;
  
  clearWorld();
  
  ground.update(gameSpeed, frameRate);
  dino.update(gameSpeed, frameRate);

  dino.draw()
  ground.draw()
  
  requestAnimationFrame(worldLoop);
}

requestAnimationFrame(worldLoop);