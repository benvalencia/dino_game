export default class Dino {
  WALKING_SPEED = 200;
  walkSpeed = this.WALKING_SPEED;
  dinoImages = [];

  jumpPressed = false;
  isJumping = false;
  falling = false;
  jumpVelocity = .6;
  gravity = 0.4;

  constructor(context, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
    this.context = context;
    this.world = context.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    this.x = this.width;
    this.y = this.world.height - this.height - 1.5 * this.scaleRatio;
    this.yStadingPosition = this.y;
    
    this.standingStillImage = new Image();
    this.standingStillImage.src = './images/standing_still.png';
    this.image = this.standingStillImage;

    const dinoRunImageOne = new Image();
    dinoRunImageOne.src = './images/dino_run1.png';
    const dinoRunImageTwo = new Image();
    dinoRunImageTwo.src = './images/dino_run2.png';

    this.dinoImages.push(dinoRunImageOne);
    this.dinoImages.push(dinoRunImageTwo);


    window.removeEventListener('keydown', this.keydown)
    window.removeEventListener('keyup', this.keyup)

    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);

    window.removeEventListener('touchstart', this.touchstart);
    window.removeEventListener('touchend', this.touchend);

    window.addEventListener('touchstart', this.touchstart);
    window.addEventListener('touchend', this.touchend);

  }

  keydown = (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      this.jumpPressed = true;
    }
  }
  keyup = (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      this.jumpPressed = false;
    }
  }

  touchstart = (e) => {
    this.jumpPressed = true;
  }
  touchend = (e) => {
    this.jumpPressed = false;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(gameSpeed, frameRate) {
    this.run(gameSpeed, frameRate);
    this.jump(frameRate)
  }
  
  jump(frameRate) {
    if (this.jumpPressed) {
      this.isJumping = true;
    }
    
    if (this.isJumping && !this.falling) {
      if (this.y > this.world.height - this.minJumpHeight 
        || (this.y > this.world.height - this.maxJumpHeight && this.jumpPressed)
      ) {
        this.y -= this.jumpVelocity * frameRate * this.scaleRatio;
      } else {
        this.falling = true;
      }
    } else {
      if (this.y < this.yStadingPosition) {
        this.y += this.gravity * frameRate * this.scaleRatio;
        
        if (this.y + this.height > this.world.height) {
          this.y = this.yStadingPosition;
        } 
      } else {
        this.isJumping = false;
        this.falling = false;
      }
    }
  }

  run(gameSpeed, frameRate) {
    if (this.walkSpeed <= 0) {
      if (this.image === this.dinoImages[0]) {
        this.image = this.dinoImages[1];
      } else {
        this.image = this.dinoImages[0];
      }

      this.walkSpeed = this.WALKING_SPEED;
    } 
    this.walkSpeed -= gameSpeed * frameRate;
  }
}