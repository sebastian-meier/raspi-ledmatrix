const ws281x = require('rpi-ws281x-native');
const { pixelsToLEDs, fromRGBto32 } = require('./utils');

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812' });

const sceneInvaders = require('./scenes/invaders');
const sceneRain = require('./scenes/invaders');
const sceneStars = require('./scenes/invaders');

function update() {

  const color = eval(fromRGBto32([
    Math.round(Math.random()*255),
    Math.round(Math.random()*255),
    Math.round(Math.random()*255)
  ]));

  for (let a = 0; a < channel.array.length; a++) {
    channel.array[a] = color;
  }
    
  console.log('loop');
  
  ws281x.render();
}

setInterval(update, 1000);
