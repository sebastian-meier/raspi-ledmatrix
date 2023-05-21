const ws281x = require('rpi-ws281x-native');

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812' });

for (let i = 0; i < 100; i += 1) {
  if (i%2 == 0) {
    channel.array[0] = 0xff0000;
    channel.array[16*16] = 0xff0000;
    channel.array[16*16*2] = 0xff0000;
    channel.array[16*16*3] = 0xff0000;
  } else {
    channel.array[0] = 0x000000;
    channel.array[16*16] = 0x000000;
    channel.array[16*16*2] = 0x000000;
    channel.array[16*16*3] = 0x000000;
  }

  ws281x.render();
}

// channel.array[0] = 0xff0000;
// channel.array[16*16] = 0xff0000;
// channel.array[16*16*2] = 0xff0000;
// channel.array[16*16*3] = 0xff0000;