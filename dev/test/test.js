const ws281x = require('rpi-ws281x-native');

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812' });

const leds = [];
while(leds.length < 100) {
  const rnd = Math.round(Math.random()*16*16*3);
  if (!leds.includes(rnd)) {
    leds.push(rnd);
  }
}

for (let i = 0; i < 100; i += 1) {
  if (i%2 == 0) {
    leds.forEach(l => {channel.array[l] = 0xff0000;});
  } else {
    leds.forEach(l => {channel.array[l] = 0x000000;});
  }

  const start = (new Date()).getMilliseconds();
  ws281x.render();
  console.log((new Date()).getMilliseconds() - start);
}

// channel.array[0] = 0xff0000;
// channel.array[16*16] = 0xff0000;
// channel.array[16*16*2] = 0xff0000;
// channel.array[16*16*3] = 0xff0000;