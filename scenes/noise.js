const sceneBase = require('./base');
const {fromRGBto32} = require('../utils');

class sceneNoise extends sceneBase {
  black = 0x000000;

  draw() {
    const leds = [];
    for (let i = 0; i < this.canvasHeight * this.canvasWidth; i += 1) {
      if (Math.random() > 0.995) {
        leds[i] = fromRGBto32(
          Math.round(Math.random()*255),
          Math.round(Math.random()*255),
          Math.round(Math.random()*255)
        );
      } else {
        leds[i] = this.black;
      }
    }
    return leds;
  }
}

module.exports = sceneNoise;