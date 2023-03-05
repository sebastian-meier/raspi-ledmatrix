# raspi-ledmatrix
A 32x32 RGB LED matrix display controlled from a raspberry pi

## Notes

Values smaller than 30 per RGB are not visible

i2c communication require sudo rights (even with raspi-config i2c enabled)

```
sudo "$(which node)" index.js
```
