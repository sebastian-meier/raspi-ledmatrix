const ws281x = require('rpi-ws281x-native');

const channel = ws281x(16 * 16 * 4, { stripType: 'ws2812' });

channel.array[0] = 0xff0000;
channel.array[16*16] = 0xff0000;
channel.array[16*16*2] = 0xff0000;
channel.array[16*16*3] = 0xff0000;

ws281x.render();
