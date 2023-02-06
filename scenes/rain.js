const sceneBase = require('./base');

class sceneRain extends sceneBase {
  rains = [];
  trail = 7;
  
  addRains() {
    for (let i = 0; i < this.canvasWidth; i += 1) {
      if (Math.random() > 0.99) {
        this.rains.push(this.addRain(i));
      }
    }
  }
  
  addRain(x) {
    return {
      x,
      y: 0,
      v: 0.25 + Math.random()/2
    };
  }
  
  draw() {
    this.addRains();
  
    const deletions = [];

    this.rains.forEach((r,ri) => {
      for (let y = 0; (r.y - y) >= 0 && y <= this.trail; y += 1) {
        const colorVal = Math.round(255/this.trail*(this.trail-y));
	this.p.fillStyle = 'rgb('+colorVal+','+colorVal+','+colorVal+')';
        this.p.fillRect(r.x, r.y - y, 1, 1);
      }
      r.y += r.v;
      if (r.y - this.trail > this.canvasHeight) {
        deletions.push(ri);
      }
    });

    for (let d = deletions.length - 1; d >= 0; d -= 1) {
      this.rains.splice(deletions[d], 1);
    }
  }
}

module.exports = sceneRain;
