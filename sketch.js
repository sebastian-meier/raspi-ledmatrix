const mSize = 16;

let sketch = function(p) {
  const canvasWidth = 32;
  const canvasHeight = 32;
  const scenes = [];

  p.setup = function() {
    p.createCanvas(canvasWidth, canvasHeight);
    p.pixelDensity(1);
    scenes.push(new sceneLines(canvasWidth, canvasWidth, p));

    scenes[0].setup();
  };

  p.draw = function() {
    p.background(0);
    scenes[0].draw();

    // p.loadPixels();
    
    // const led = [[{},{}],[{},{}]];
    // for (let pi = 0; pi < p.pixels.length - 1; pi += 4) {
    //   const pID = pi/4;
    //   const y = Math.floor(pID / canvasWidth);
    //   const x = pID - y * canvasWidth;
    //   const mYID = Math.floor(y / mSize);
    //   const mXID = Math.floor(x / mSize);
    //   const mY = y - mYID * mSize;
    //   const mX = x - mXID * mSize;

    //   const mID = mY * mSize + mX;

    //   led[mXID][mYID][mID] = [
    //     p.pixels[pi],
    //     p.pixels[pi + 1],
    //     p.pixels[pi + 2]
    //   ];
    // }
  };
};

let myp5 = new p5(sketch);