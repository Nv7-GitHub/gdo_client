package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"
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
		resp, err := http.Post(prefix+"gdo/disconnect", "text/plain", strings.NewReader(uid))
		handle(err)
		getContent(resp)
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
		}

		respond(handler())
	}
}

func respond(response string) {
	postJSON(prefix+"gdo/finish", eventRequest{
		Event: response,
		UID:   uid,
	})
}
