const canvasSketch = require('canvas-sketch');
const {createCanvas} = require('canvas');
const p5 = require('p5');
const gl = require('gl');

// Optional preloader
const preload = p5 => {
  // Can p5.loadImage() here and so forth
};

// Create a new 'node-canvas' interface
const canvas = createCanvas();

const settings = {
  // Pass in the Cairo-backed canvas
  canvas,
  animate: true,
  p5: { p5, preload },
  // Optionally set dimensions / units / etc
  // ...
};

const sketch = () => {
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    p5.background(0);
    p5.fill(255);
    p5.noStroke();

    const anim = p5.sin(time - p5.PI / 2) * 0.5 + 0.5;
    p5.rect(0, 0, width * anim, height);
  };
};

canvasSketch(sketch, settings)
  .then(() => {
    // Once sketch is loaded & rendered, stream a PNG with node-canvas
    const out = fs.createWriteStream('output.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('Done rendering'));
  });



