# GDO
Remotely open your garage door, using your Raspberry Pi, without messing around with your garage door!

# Hardware
The way it works is it uses a servo motor to press a button on a garage door remote. The steps are explained below.

## Table of Contents:
- [Part 1](#part-1:-make-a-servo-able-to-press-your-garage-door)
- [Part 2](#part-2:-connect-the-servo-to-the-raspberry-pi)

## Part 1: Make a servo able to press your garage door

This varies from remote to remote. If it is working then when rotated, it should click the button on the remote

## Part 2: Connect the servo to the Raspberry Pi

A servo motor has 3 connectors: Power, Ground, and PWM. Usually the power pin has a red wire, and the ground pin has a black wire. The remaining pin is the PWM pin. You must connect these pins to the corresponding GPIO pins on the Raspberry Pi.

A diagram of the Raspberry Pi's GPIO pins are below:
![Raspberry Pi Pin Map](https://docs.microsoft.com/en-us/windows/iot-core/media/pinmappingsrpi/rp2_pinout.png)
I connected the power pin to `Pin 2` (5 Volt Power). You may need to connect it to `Pin 1` (3.3 Volt Power) if it is a 3.3 Volt servo, which you can usually find in the manufacturer's information, or just on its Amazon page. I connected the ground pin to `Pin 6` (Ground). 

## **Important Part:**
You must connect the PWM pin to a GPIO pin. I connected mine to `GPIO 23`, or `Pin 16`. You can connect it to any `GPIO` pin. **Keep track of which GPIO number you connected it to!**

# Software
This is where the client comes in. You must install it's dependencies, and then install it by building the source.
## Table of Contents
- [Part 1](#part-1:-installing-go)
- [Part 2](#part-2:-installing-pi-blaster)
- [Part 3](#part-3:-installing-the-client)

## Part 1: Installing Go
You need Go in order to compile the client. To install Go on my Raspberry Pi, I followed [this](https://pimylifeup.com/raspberry-pi-golang/) excellent tutorial. If you don't want to go through it, you can run the following commands:
### Step 1: Update your Raspberry Pi
```bash
sudo apt update
sudo apt full-upgrade
```

### Step 2: Installing Go
```bash
cd ~/Downloads
wget https://dl.google.com/go/go1.16.4.linux-armv6l.tar.gz -O go.tar.gz
sudo tar -C /usr/local -xzf go.tar.gz
```

### Step 3: Configure Go
Use
```bash
nano ~/.bashrc
```
This will bring up a file editor. Scroll to the bottom of the file (by using the down arrow key or the scroll wheel), and add the following lines:
```bash
export GOPATH=$HOME/go
export PATH=/usr/local/go/bin:$PATH:$GOPATH/bin
```
Finally, use `ctrl+x` to bring up the save menu and then press `y` to confirm the changes. This will bring you back to the terminal.

## Part 2: Installing Pi Blaster
The [servo library I am using](https://github.com/cgxeiji/servo) requires [pi-blaster](https://github.com/sarfata/pi-blaster) to work. You can follow the instructions at [their repository](https://github.com/sarfata/pi-blaster). However, I used the following commands:

### Step 1: Get Dependencies
```bash
sudo apt-get install autoconf
```

### Step 2: Download
```bash
cd ~/Downloads
git clone https://github.com/sarfata/pi-blaster.git
cd pi-blaster
```

### Step 3: Compile
```bash
./autogen.sh
./configure
make
```

### Step 4: Install
```bash
sudo make install
```

## Part 3: Installing the Client
Now, you need to install the client. Do this by using the following commands:
```bash
git clone https://github.com/Nv7-GitHub/gdo_client.git
cd gdo_client/client
go install
```

# Using the Client

## Table of Contents
- [Setting up the Client](#setting-up-the-client)
- [Using GDO](#using-gdo)

## Setting up the Client

### Part 1: Register or not?
Now, you can just use the `client` command to run the client.
When you run the command, you will be prompted to login or make an account. If this is your first time following these steps, then answer `Y`. Otherwise, you have already made an account and can answer `N`.

### Part 2: Logging In
Now, enter in your username and password. If you are making an account, then come up with a unique username and a strong password. Otherwise, use the username and password of the account you already made. You will use this to log into the user-facing client.

### Part 3: Giving it hardware info
Now, you need to setup the client. First, it will ask you if your garage door is open. This initializes its internal state. Say `Y` if its open, `N` if it isn't. Next, it will ask you for your servo pin. This is the servo pin from the [hardware step](#**important-part:**).

Now, its ready to go!

## Using GDO
To use GDO, you need to use [The GDO Web App - https://gdoweb.tk](https://gdoweb.tk).

### Step 1: Log in
Enter in the username and password from [Part 1](#part-2:-logging-in). Now, press `Log In`. 

### Step 2: Use GDO!
Press Open/Close Door to Open or Close your garage door, remotely!