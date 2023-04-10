import board
import neopixel
from PIL import Image, ImageDraw, ImageColor
import math
import adafruit_pixelbuf
# import random

numLeds = 16*16*4

pixels = adafruit_pixelbuf.PixelBuf(numLeds, byteorder="RGB")

img = Image.new('RGB', (32 * 4, 32 * 4), color = 'black')
im  = Image.new("RGB", (32, 32), (0, 0, 0))
draw = ImageDraw.Draw(img)

# pixels = neopixel.NeoPixel(board.D18, 16*16*4, auto_write=False, brightness=1.0)

cache = [(0, 0, 0)] * numLeds

for a in range(360):
  draw.rectangle((0, 0, 32 * 4, 32 * 4), (0, 0, 0))
  # draw.rectangle((8*4,8*4,24*4,24*4), (0,255,0))

  rad = math.pi / 180.0 * a
  sx = 16.0 * 4 * math.cos(rad)
  sy = 16.0 * 4 * math.sin(rad)

  draw.line((16 * 4, 16 * 4, sx + 16 * 4, sy + 16 * 4), fill=(255,255,255))

  im = img.resize((32,32), Image.ANTIALIAS)

  px = im.load()

  rX = 32
  rY = 32

  # Display setup:
  # 0|1
  # ---
  # 3|2

  for x in range(32):
    for y in range(32):

      xOff = 0
      yOff = 0
      mId = None

      if x < rX/2: 
        if y < rY/2:
          mId = 0
        else:
          mId = 3
          yOff = 16
      else:
        if y < rY/2:
          mId = 1
          xOff = 16
        else:
          mId = 2
          xOff = 16
          yOff = 16
    
      oX = x - xOff
      oY = y - yOff

      oId = oX * 16 + oY

      if oX%2 != 0:
        oId = oX * 16 - 1 + (16 - oY)

      oId += mId * 16 * 16

      tColor = px[x, y]

      if tColor != cache[oId]:
        cache[oId] = tColor
        pixels[oId] = tColor

  pixels.show()
