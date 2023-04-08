const sceneBase = require('./base');

class sceneLines extends sceneBase {
  outset = 32;
  rotation = 0;
  rotSpeed = Math.PI/180/2;

  spacing = 5;

  setup() {
  }
  
  draw() {
    this.p.fillStyle = "rgb(255,0,0)";
    this.p.strokeStyle = '#ffffff';
    this.p.lineWidth = 2;

    this.p.save();
    this.p.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    this.p.rotate(this.rotation);

    for (let x = 0; x < this.canvasWidth + 2 * this.outset; x += this.spacing) {
      const tx = -this.outset - this.canvasWidth / 2 + x;
      this.p.beginPath();
      this.p.moveTo(tx, -this.outset);
      this.p.lineTo(tx, this.canvasHeight + this.outset);
      this.p.stroke();
    }

    this.rotation += this.rotSpeed;
    this.p.restore();
  }
}

module.exports = sceneLines;
