const p5 = require('node-p5');
const ws281x = require('rpi-ws281x-native');
const { pixelsToLEDs } = require('./utils');

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812' });

const sceneInvaders = require('./scenes/invaders');
const sceneRain = require('./scenes/invaders');
const sceneStars = require('./scenes/invaders');

function sketch(p) {
  const scenes = [];
  p.setup = () => {
      p.createCanvas(32, 32);
  }

  p.draw = () => {
    p.background(0);
    p.fill(p.color(
      Math.round(p.random(0,255)),
      Math.round(p.random(0,255)),
      Math.round(p.random(0,255))
    ));
    p.rect(8, 8, 16, 16);
    p.loadPixels();
    const leds = pixelsToLEDs(p.pixels);
    
    for (let a = 0; a < channel.array.length && a < leds.length; a++) {
      channel.array[a] = leds[a];
    }
    
    console.log('loop');
  
    ws281x.render();
    // p.noLoop();
  }
}

let p5Instance = p5.createSketch(sketch);
