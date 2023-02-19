const fromRGBto32 = (rgbArr) => {
  return '0x' + rgbArr.reduce((s, v) => {
    return s + ('0' + v.toString(16)).slice(-2);
  },'');
};

const pixelsToLEDs = (p) => {
  // resolution x/y
  const rX = 32;
  const rY = 32;

  /*
   Display setup:
   1|3
   ---
   2|4
   */
  const matrices = [[],[],[],[]];
  for (let l = 0; l < p.length; l += 4) {
    const id = l / 4;
    const y = Math.floor(id / rX);
    const x = id - y * rX;

    let mId;
    if (x < rX/2) {
      if (y < rY/2) {
        mId = 0;
      } else {
        mId = 1;
      }
    } else {
      if (y < rY/2) {
        mId = 2;
      } else {
        mId = 3;
      }
    }
    
    matrices[mId].push(eval(fromRGBto32(
      [
        p[l],
        p[l + 1],
        p[l + 2]
      ]
    )));
  }

  return matrices.flat();
};

module.exports = { fromRGBto32, pixelsToLEDs };
