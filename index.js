const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');

const { createCanvas } = require('canvas');
const ws281x = require('rpi-ws281x-native');
const { pixelsToLEDs, fromRGBto32 } = require('./utils');

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812', brightness: 10 });

const sceneInvaders = require('./scenes/invaders');
const sceneRain = require('./scenes/invaders');
const sceneStars = require('./scenes/invaders');
const sceneLines = require('./scenes/lines');

const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');
let data;
let counter = 0;

function update() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 32, 32);

  ctx.fillStyle = 'rgb(' + 
    Math.round(Math.random()*255) + ', ' +
    Math.round(Math.random()*255) + ', ' +
    Math.round(Math.random()*255) + 
  ')';
  ctx.fillRect(8, 8, 16, 16);

  data = ctx.getImageData(0, 0, 32, 32);
  let leds = pixelsToLEDs(data.data);
  
  delete data;
  
  for (let a = 0; a < channel.array.length && a < leds.length; a++) {
     channel.array[a] = leds[a];
  }
  
  delete leds;
  
  console.log('loop');
  counter++;

  ws281x.render();
}

setInterval(update, 1500);
