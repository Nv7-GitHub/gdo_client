package main

const prefix = "http://localhost:3000/" // use https://api.nv7haven.tk/ in prod

var uid string

func main() {
	uid = login()
	listen()
}
