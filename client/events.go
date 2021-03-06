package main

import (
	"errors"
	"strconv"
	"strings"
	"time"

	"github.com/cgxeiji/servo"
)

var doorIsOpen = false
var motor *servo.Servo

func getData() {
	doorIsOpen = strings.Contains(strings.ToLower(input("Is Garage Door Open? (y/n): ")), "y")

	err := errors.New("")
	var servoPin int
	for err != nil {
		servoPin, err = strconv.Atoi(input("Servo Pin: "))
	}
	motor = servo.New(servoPin)
	motor.SetPosition(0)

	err = motor.Connect()
	if err != nil {
		panic(err)
	}
}

var events = map[string]func() string{
	"dooropen": doorOpen,
	"isopen":   isOpen,
}

func doorOpen() string {
	motor.MoveTo(90).Wait()
	time.Sleep(time.Second / 4)
	motor.MoveTo(0).Wait()

	doorIsOpen = !doorIsOpen

	return "finished"
}

func isOpen() string {
	if doorIsOpen {
		return "true"
	}
	return "false"
}
