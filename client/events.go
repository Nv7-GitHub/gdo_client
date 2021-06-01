package main

import (
	"fmt"
	"strings"
	"time"
)

var doorIsOpen = false

func getData() {
	doorIsOpen = strings.Contains(strings.ToLower(input("Is Garage Door Open? (y/n): ")), "y")
}

var events = map[string]func() string{
	"dooropen": doorOpen,
	"isopen":   isOpen,
}

func doorOpen() string {
	// Connect to servo and open door, right now it just waits to simulate that
	fmt.Println("\nClicking button...")
	time.Sleep(time.Second * 1)
	doorIsOpen = !doorIsOpen
	fmt.Println("Clicked button!")

	return "finished"
}

func isOpen() string {
	if doorIsOpen {
		return "true"
	}
	return "false"
}
