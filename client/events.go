package main

import (
	"fmt"
	"time"
)

var events = map[string]func() string{
	"dooropen":  doorOpen,
	"takeimage": takeImage,
}

func doorOpen() string {
	// Connect to servo and open door, right now it just waits to simulate that
	fmt.Println("\nOpening door...")
	time.Sleep(time.Second * 1)
	fmt.Println("Opened door!")

	return "finished"
}

func takeImage() string {
	// Upload image to Nv7haven API, right now just wait to simulate that
	fmt.Println("\nUploading image...")
	time.Sleep(time.Second * 1)
	fmt.Println("Uploaded image!")

	return "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2019/12/03202400/Yellow-Labrador-Retriever.jpg"
}
