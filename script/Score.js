export default class Score {
  score = 0;
  HIGH_SCORE_KEY = 'dino_high_score';
    constructor(context, scaleRation) {
        this.context = context;
        this.world = context.canvas;
        this.scaleRation = scaleRation;
    }
    
    update(frameRate) {
        this.score += 0.01 * frameRate;
    }
    
    draw() {
      const highScore = this.getHighScore();
        const fontSize = 20 * this.scaleRation;
        this.context.fillStyle = "grey";
        this.context.font = `${fontSize}px Arial`;
        
        
        this.context.fillText(
            `Score: ${Math.floor(this.score)}`,
            this.world.width - 150 * this.scaleRation,
            30 * this.scaleRation
        );
        this.context.fillText(
          `High Score: ${highScore}`,
          this.world.width - 150 * this.scaleRation,
          50 * this.scaleRation
      );
    }
    
    reset() {
        this.score = 0;
    }
    
    setHighScore() {
      if (this.score > this.getHighScore()) {
        localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
      }
    }
    
    getHighScore() {
        return Number(localStorage.getItem(this.HIGH_SCORE_KEY) || 0);
    }
    
}