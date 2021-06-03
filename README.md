# GDO
Remotely open your garage door, using your raspberry pi!

# Hardware
1. Make a servo able to press your garage door

When rotated, it should click the button on the remote

2. Connect the servo to the Raspberry Pi.

A servo motor has 3 connectors: Power, Ground, and PWM. Usually the power pin has a red wire, and the ground pin has a black wire. The remaining pin is the PWM pin. You must connect these pins to the corresponding GPIO pins on the Raspberry Pi.

A diagram of the Raspberry Pi's GPIO pins are below:
![Raspberry Pi Pin Map](https://docs.microsoft.com/en-us/windows/iot-core/media/pinmappingsrpi/rp2_pinout.png)
I connected the power pin to `Pin 2` (5 Volt Power). You may need to connect it to `Pin 1` (3.3 Volt Power) if it is a 3.3 Volt servo, which you can usually find in the manufacturer's information, or just on its Amazon page. I connected the ground pin to `Pin 6` (Ground). 

## **Important Part:**
You must connect the PWM pin to a GPIO pin. I connected mine to `GPIO 23`, or `Pin 16`. You can connect it to any `GPIO` pin. **Keep track of which GPIO number you connected it to!**

# Software
