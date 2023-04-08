const sceneBase = require('./base');

class sceneStars extends sceneBase {
  maxSize = 4;
  
  stars = [];
  maxStars = 12;
  
  setup = () => {
    this.stars = [];
    this.addStars(this.maxStars);
  };
  
  addStars(num) {
    for (let i = 0; i < num; i += 1) {
      this.stars.push(this.addStar());
    }
  }
  
  addStar() {
    const size = Math.random() * this.maxSize;
    return {
      x: size/2 + Math.round(Math.random()*(this.canvasWidth-size)),
      y: size/2 + Math.round(Math.random()*(this.canvasHeight-size)),
      s: 0,
      sm: size,
      ss: (1 + Math.random())*(this.maxSize/50),
      sd: true
    };
  }
  
  draw() {
    this.p.fillStyle = "#ffffff";
    this.p.strokeStyle = "transparent";
  
    this.stars.forEach((s,si) => {
      this.p.arc(s.x, s.y, s.s, 0, Math.PI * 2);
      s.s += s.sd ? s.ss : -s.ss;
      if (s.s > s.sm) {
        s.sd = false;
      } else if (s.s < 0) {
  
        this.stars[si] = this.addStar();
      }
    });
  }
}

module.exports = sceneStars;