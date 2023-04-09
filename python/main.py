import board
import neopixel
from PIL import Image, ImageDraw, ImageColor
import math
import random
  
img = Image.new('RGB', (32, 32), color = 'black')
draw = ImageDraw.Draw(img)

pixels = neopixel.NeoPixel(board.D18, 16*16*4)

for a in range(360):
  print(a)
  draw.rectangle((0,0,32,32), (random() * 255.0, random() * 255.0, random() * 255.0))

  rad = math.pi / 180.0 * a
  sx = 16.0 * math.cos(rad)
  sy = 16.0 * math.sin(rad)

  draw.line((16, 16, sx, sy), fill=128)

  px = img.load()

  rX = 32
  rY = 32

  # Display setup:
  # 1|0
  # ---
  # 2|3

  """for x in range(32):
    for y in range(32):

      xOff = 0
      yOff = 0
      mId = None

      if x < rX/2: 
        if y < rY/2:
          mId = 1
        else:
          mId = 2
          yOff = 16
      else:
        if y < rY/2:
          mId = 0
          xOff = 16
        else:
          mId = 3
          xOff = 16
          yOff = 16
    
      oX = x - xOff
      oY = y - yOff

      oId = oX * 16 + oY

      if oX%2 != 0:
        oId = oX * 16 - 1 + (16 - oY)

      oId += mId * 16 * 16

      pixels[oId] = px[x, y]"""

  pixels.show()
