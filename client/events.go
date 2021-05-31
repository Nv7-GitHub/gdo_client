package main

var events = map[string]func() string{
	"dooropen": doorOpen,
}

func doorOpen() string {
	// Connect to servo and open door
	return "finished"
}
