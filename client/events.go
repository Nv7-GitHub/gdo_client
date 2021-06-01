package main

import (
	"fmt"
	"time"
)

var events = map[string]func() string{
	"dooropen": doorOpen,
}

func doorOpen() string {
	// Connect to servo and open door, right now it just waits to simulate that
	fmt.Println("\nOpening door...")
	time.Sleep(time.Second * 1)
	fmt.Println("Opened door!")

	return "finished"
}
