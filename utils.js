const fromRGBto32 = (r,g,b) => {
  return (r << 16) + (g << 8) + b;
};

const xy2id = (x, y) => {
  const w = 32;
  const h = 32;
  return x + y * 32;
};

const id2xy = (id) => {
  const w = 32;
  const h = 32;
  const y = Math.floor(id / w);
  const x = id - y * w;
  return {x, y};
};

const pixelsToLEDs = (p) => {
  // resolution x/y
  const rX = 32;
  const rY = 32;

  /*
   Display setup:
   0|1
   ---
   3|2
   */
  const matrices = [
    new Array(16*16),
    new Array(16*16),
    new Array(16*16),
    new Array(16*16)
  ];

  for (let l = 0; l < p.length; l += 4) {
    const id = l / 4;
    const y = Math.floor(id / rX);
    const x = id - y * rX;
    
    let xOff = 0;
    let yOff = 0;
    let mId;
    if (x < rX/2) {
      if (y < rY/2) {
        mId = 0;
      } else {
        mId = 3;
        yOff = 16;
      }
    } else {
      if (y < rY/2) {
        mId = 1;
        xOff = 16;
      } else {
        mId = 2;
        xOff = 16;
        yOff = 16;
      }
    }
    
    const oX = x - xOff;
    const oY = y - yOff;
    let oId = oX * 16 + oY;

    if (oX%2 !== 0) {
      oId = oX * 16 - 1 + (16 - oY);
    }

    matrices[mId][oId] = fromRGBto32(
      
        p[l] > 0 ? Math.max(30, p[l]) : 0,
        p[l + 1] > 0 ? Math.max(30, p[l + 1]) : 0,
        p[l + 2] > 0 ? Math.max(30, p[l + 2]) : 0

    );
  }
  
  return matrices.flat();
};

const arrayToLEDs = (p) => {
  // resolution x/y
  const rX = 32;
  const rY = 32;

  /*
   Display setup:
   0|1
   ---
   3|2
   */
  const matrices = [
    new Array(16*16),
    new Array(16*16),
    new Array(16*16),
    new Array(16*16)
  ];

  for (let l = 0; l < p.length; l += 1) {
    const id = l;
    const y = Math.floor(id / rX);
    const x = id - y * rX;
    
    let xOff = 0;
    let yOff = 0;
    let mId;
    if (x < rX/2) {
      if (y < rY/2) {
        mId = 0;
      } else {
        mId = 3;
        yOff = 16;
      }
    } else {
      if (y < rY/2) {
        mId = 1;
        xOff = 16;
      } else {
        mId = 2;
        xOff = 16;
        yOff = 16;
      }
    }
    
    const oX = x - xOff;
    const oY = y - yOff;
    let oId = oX * 16 + oY;

    if (oX%2 !== 0) {
      oId = oX * 16 - 1 + (16 - oY);
    }

    matrices[mId][oId] = p[l];
  }
  
  return matrices.flat();
};

module.exports = { fromRGBto32, arrayToLEDs, pixelsToLEDs, id2xy, xy2id };