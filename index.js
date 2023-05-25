const PImage = require('pureimage');
const ws281x = require('rpi-ws281x-native');
const i2c = require("i2c-bus");
const oled = require("oled-i2c-bus");
const font = require("oled-font-5x7");
const Gpio = require("pigpio").Gpio;
const { pixelsToLEDs, fromRGBto32 } = require('./utils');

console.log("import complete");

/* LED-MATRIX */
const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812', brightness: 10 });

/* OLED DISPLAY */
// const i2cBus = i2c.openSync(1);
// const opts = {
// 	width: 128,
// 	height: 64,
// 	address: 0x3C
// };

// const display = new oled(i2cBus, opts);
// try {
//   display.turnOnDisplay();
//   display.clearDisplay();
//   display.setCursor(1,1);
//   display.writeString(font, 1, 'STARTING UP...', 1, true);
// } catch (e) {
//   console.log('Wackelkontakt', e);
// }

/* IMPORT SCENES */
const sceneClasses = [
  require('./scenes/invaders'),
  require('./scenes/rain'),
  require('./scenes/stars'),
  require('./scenes/lines')  
];
const scenes = [];

const canvas = PImage.make(32, 32);
const ctx = canvas.getContext('2d');

sceneClasses.forEach(S => {
  const scene = new S(32, 32, ctx);
  scene.setup();
  scenes.push(scene);
});

let currentScene = scenes.length - 1;
let modi = 'scenes';

/* BUTTONS */
const buttons = [];
const ids = [17,27,5,6];
const callbacks = [
	(level, tick) => {
    console.log(1,level,tick);
    if (level === 1) {
      // PLAY
      modi = 'scenes';
      nextScene();
    }
  },
	(level, tick) => {
    console.log(2,level,tick);
    // RIGHT
    if (level === 1) {
      modi = 'right';
    }
  },
	(level, tick) => {
    console.log(3,level,tick);
    // LEFT
    if (level === 1) {
      modi = 'left';
    }
  },
	(level, tick) => {
    console.log(4,level,tick);
    // STOP
    if (level === 1) {
      modi = 'drive';
    }
  }
];

function nextScene() {
  lastTime = (new Date()).getTime();
  currentScene += 1;
  if (currentScene >= scenes.length) {
    currentScene = 0;
  }
  // try {
  //   display.clearDisplay();
  //   display.setCursor(1,1);
  //   display.writeString(font, 1, 'SCENE #'+ currentScene, 1, true);
  // } catch (e) {
  //   console.log('Wackelkontakt', e);
  // }
  console.log("nextScene", currentScene);
}

ids.forEach((id, i) => {
	const button = new Gpio(id, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_UP,
		alert: true
	});
	button.glitchFilter(10000);
	button.on("alert", callbacks[i]);
	buttons.push(button);
});

const loopTime = 1000 * 60 * 5;
let lastTime;
let data;

nextScene();

function update() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 32, 32);

  if (modi === 'scenes') {
    scenes[currentScene].draw();
  } else if (modi === 'left') {

  } else if (modi === 'right') {

  } else if (modi === 'drive') {

  }

  data = ctx.getImageData(0, 0, 32, 32);
  let leds = pixelsToLEDs(data.data);

  for (let a = 0; a < channel.array.length && a < leds.length; a++) {
    if (channel.array[a] != leds[a]) {
        channel.array[a] = leds[a];
    }
  }
  
  ws281x.render();

  if ((new Date()).getTime() - lastTime > loopTime) {
    nextScene();
  }

  setImmediate(update);
}

update();

/* ON EXIT */
function exitHandler(options, exitCode) {
  ws281x.finalize();
  i2cBus.closeSync();
  console.log(options.cleanup, options.exit, exitCode);
  process.exit();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));