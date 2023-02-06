// const SegfaultHandler = require('segfault-handler');
// SegfaultHandler.registerHandler('crash.log');

const PImage = require('pureimage');
const ws281x = require('rpi-ws281x-native');
const { pixelsToLEDs, fromRGBto32 } = require('./utils');

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812', brightness: 10 });

const sceneInvaders = require('./scenes/invaders');
const sceneRain = require('./scenes/rain');
const sceneStars = require('./scenes/stars');
const sceneLines = require('./scenes/lines');

const canvas = PImage.make(32, 32);
const ctx = canvas.getContext('2d');

const lines = new sceneRain(32,32,ctx);
lines.setup();

let data;
let counter = 0;

function update() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 32, 32);

  lines.draw();

  data = ctx.getImageData(0, 0, 32, 32);
  let leds = pixelsToLEDs(data.data);
  
  delete data;
  
  for (let a = 0; a < channel.array.length && a < leds.length; a++) {
     channel.array[a] = leds[a];
  }
  
  delete leds;
  
  
  ws281x.render();
  setImmediate(update);
}

update();
