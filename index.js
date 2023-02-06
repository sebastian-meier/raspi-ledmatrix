const p5 = require('node-p5');
const { pixelsToLEDs } = require('./utils');

const sceneInvaders = require('./scenes/invaders');
const sceneRain = require('./scenes/invaders');
const sceneStars = require('./scenes/invaders');
const sceneLines = require('./scenes/lines');

function sketch(p) {
  const scenes = [];
  p.setup = () => {
      p.createCanvas(32, 32);
  }

  p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(8, 8, 16, 16);
      p.loadPixels();
      const leds = pixelsToLEDs(p.pixels);
      console.log(leds.length, 32*32);
  }
}

let p5Instance = p5.createSketch(sketch);