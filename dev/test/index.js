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