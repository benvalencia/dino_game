export default class Cactus {
  constructor(context, x, y, width, height, image) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }
  
  update(cactusSpeed, gameSpeed, frameRate, scaleRatio) {
    this.x -= cactusSpeed * gameSpeed * frameRate * scaleRatio;
  }
  
  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkCollision(dino) {
    const near = 1.4;
    if (
      dino.x < this.x + this.width / near &&
      dino.x + dino.width / near > this.x &&
      dino.y < this.y + this.height / near &&
      dino.y + dino.height / near > this.y
    ) {
      return true;
    }
    return false;
  }
}