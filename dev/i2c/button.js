/*const gpio = require("gpio");
const pin24 = gpio.export(22, {
	direction: gpio.DIRECTION.IN,
	ready: () => {
		console.log("ready");
		pin24.on("change", (val) => {
			console.log("change", val);
		});
	}
});

setTimeout(() => {
	pin24.removeAllListeners("change");
	pin24.reset();
	pin24.unexport(() => {
		process.exist();
	});
});*/

/*const wpi = require("node-wiring-pi");
wpi.setup("wpi");
const pin = 14;
wpi.pinMode(pin, wpi.INPUT);
setInterval(() => {
	const val = wpi.digitalRead(pin);
	console.log(val);
}, 500);*/

const Gpio = require("pigpio").Gpio;
//26, 19
// 

const buttons = [];
const ids = [17,27,5,6];
const callbacks = [
	(level, tick) => { console.log("1",level,tick); },
	(level, tick) => { console.log("2",level,tick); },
	(level, tick) => { console.log("3",level,tick); },
	(level, tick) => { console.log("4",level,tick); }
];

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


