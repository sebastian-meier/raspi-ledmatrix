
const i2c = require("i2c-bus");
const i2cBus = i2c.openSync(1);
const oled = require("oled-i2c-bus");
const font = require("oled-font-5x7");

const w = 128;
const h = 64;

const opts = {
	width: w,
	height: h,
	address: 0x3C
};

const display = new oled(i2cBus, opts);
display.turnOnDisplay();
display.clearDisplay();

const stripes = [];
for (let x = -h; x < w; x += 3) {
	for (let y = 0; y < h; y += 1) {
		if (x+y >= 0 && y >= 0 && x+y < w && y < h) {
			stripes.push([x + y, y, 1]);
		}
	}
}

/*display.drawPixel([
	[0,0,255],
	[127,0,255],
	[127,63,255],
	[0,63,255],
]);*/

// display.fillRect(0,0,128,64,1);
// display.invertDisplay(true);

display.setCursor(1,1);
display.writeString(font, 1, 'HELLO World!', 1, true);

i2cBus.closeSync();

/*
const i2c = require("i2c");
const address = 0x3D;
const wire = new i2c(address, {device: '/dev/i2c-1'});
wire.scan((err, data) => {
	if (err) console.err(err);
	console.log(data);
});
*/

