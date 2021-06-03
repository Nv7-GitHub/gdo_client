package main

import "fmt"

var uid string

func main() {
	uid = login()
	getData()
	fmt.Println("Listening for events!")
	listen()
}
