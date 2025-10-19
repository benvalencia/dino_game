const dino_game = document.getElementById("dino_game");
const context = dino_game.getContext("2d");

const WORLD_WIDTH = 800;
const WORLD_HEIGHT = 200;
const DINO_WIDTH = 88 / 1.5;
const DINO_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = WORLD_HEIGHT;
const MIN_JUMP_HEIGHT = 150;

let scaleRatio = null;
let previousTime = null;  

function setScreen() {
  scaleRatio = getScaleRatio();
  
  dino_game.width = WORLD_WIDTH * scaleRatio;
  dino_game.height = WORLD_HEIGHT * scaleRatio;
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
  requestAnimationFrame(worldLoop);
}

requestAnimationFrame(worldLoop);