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
}