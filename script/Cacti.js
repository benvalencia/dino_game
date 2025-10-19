import Cactus from "./Cactus.js";

export default class Cacti {
  CACTUS_EXISTENCE_PROBABILITY_MIN = 500;
  CACTUS_EXISTENCE_PROBABILITY_MAX = 1900;
  
  cactusInterval = null;
  cacti = [];
  constructor(context, cactusImage, scaleRatio, speed) {
    this.context = context;
    this.world = context.canvas;
    this.cactusImage = cactusImage;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    
    this.setNextCactusInterval();
  }
  
  update(gameSpeed, frameRate) {
    if (this.cactusInterval <= 0) {
      this.createCactus();
      this.setNextCactusInterval();
    }
    
    this.cactusInterval -= frameRate;
    this.cacti.forEach((cactus, index) => {
      cactus.update(this.speed, gameSpeed, frameRate, this.scaleRatio);
    });
    
    this.cacti = this.cacti.filter(cactus => cactus.x > -cactus.width);
  }
  
  createCactus() {
    const index = this.getRandomNumber(0, this.cactusImage.length - 1);
    const cactusInfo = this.cactusImage[index];
    const x = this.world.width * 1.5;
    const y = this.world.height - cactusInfo.height;
    const cactus = new Cactus(this.context, x, y, cactusInfo.width, cactusInfo.height, cactusInfo.image);
    
    this.cacti.push(cactus);
  }
  
  draw() {
    this.cacti.forEach((cactus) => {
      cactus.draw();
    });
  }

  setNextCactusInterval() {
    const num = this.getRandomNumber(
      this.CACTUS_EXISTENCE_PROBABILITY_MIN,
      this.CACTUS_EXISTENCE_PROBABILITY_MAX
    ); 
    this.cactusInterval = num;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}