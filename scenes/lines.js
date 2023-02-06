const sceneBase = require('./base');

class sceneLines extends sceneBase {
  outset = 32;
  rotation = 0;
  rotSpeed = Math.PI/180/10;

  spacing = 4;

  setup() {
  }
  
  draw() {
    this.p.noFill();
    this.p.stroke(255);

    this.p.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    this.p.rotate(this.rotation);

    for (let x = 0; x < this.canvasWidth + 2 * this.outset; x += this.spacing) {
      const tx = -this.outset - this.canvasWidth / 2 + x;
      this.p.line(
        tx, -this.outset,
        tx, this.canvasHeight + this.outset
      );
    }

    this.rotation += this.rotSpeed;
  }
}

module.exports = sceneLines;