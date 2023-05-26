const { arrayToLEDs, xy2id, fromRGBto32 } = require('../utils');
const sceneBase = require('./base');

class sceneRain extends sceneBase {
  rains = [];
  trail = 5;

  black = 0x000000;
  white = 0xFFFFFF;
  
  addRains() {
    for (let i = 0; i < this.canvasWidth; i += 1) {
      if (Math.random() > 0.997) {
        this.rains.push(this.addRain(i));
      }
    }
  }
  
  addRain(x) {
    return {
      x,
      y: 0,
      v: 0.35 + Math.random()/2
    };
  }
  
  draw() {
    this.addRains();

    const leds = [];
    for (let i = 0; i < this.canvasHeight * this.canvasWidth; i += 1) {
      leds.push(this.black);
    }

    const deletions = [];

    this.rains.forEach((r,ri) => {
      for (let y = 0; Math.floor(r.y - y) >= 0 && y <= this.trail; y += 1) {
        const rgb = 255/this.trail*(this.trail-y);
        leds[xy2id(r.x, Math.floor(r.y - y))] = fromRGBto32(rgb, rgb, rgb);
      }
      r.y += r.v;
      if (r.y - this.trail > this.canvasHeight) {
        deletions.push(ri);
      }
    });

    for (let d = deletions.length - 1; d >= 0; d -= 1) {
      this.rains.splice(deletions[d], 1);
    }

    return arrayToLEDs(leds);
  }
}

module.exports = sceneRain;