const PImage = require('pureimage');
const ws281x = require('rpi-ws281x-native');
const { pixelsToLEDs, fromRGBto32 } = require('./utils');

function exitHandler(options, exitCode) {
  ws281x.finalize();
  console.log(options.cleanup, options.exit, exitCode);
  process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812', brightness: 10 });

// const sceneInvaders = require('./scenes/invaders');
const sceneRain = require('./scenes/rain');
const sceneStars = require('./scenes/stars');
const sceneLines = require('./scenes/lines');

const canvas = PImage.make(32, 32);
const ctx = canvas.getContext('2d');

const lines = new sceneStars(32, 32, ctx);
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
