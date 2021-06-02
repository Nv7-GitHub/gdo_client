package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"

	"github.com/cgxeiji/servo"
)

type eventRequest struct {
	Event string
	UID   string
}

func listen() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		<-c
		fmt.Println("Disconnecting...")

		// Disconnect from server
		resp, err := http.Post(prefix+"gdo/disconnect", "text/plain", strings.NewReader(uid))
		handle(err)
		getContent(resp)

		// Disconnect servo
		motor.Close()
		servo.Close()

		os.Exit(0)
	}()

	for {
		evRsp, err := http.Get(prefix + "gdo/events/" + uid)
		handle(err)

		if err != nil {
			time.Sleep(time.Second * 1)
			continue
		}

		ev := getContent(evRsp)

		handler, exists := events[ev]
		if !exists {
			respond("error: unknown event")
		} else {
			respond(handler())
		}
	}
}

func respond(response string) {
	postJSON(prefix+"gdo/finish", eventRequest{
		Event: response,
		UID:   uid,
	})
}
