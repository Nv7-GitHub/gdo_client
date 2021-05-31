package main

import "net/http"

type eventRequest struct {
	Event string
	UID   string
}

func listen() {
	for {
		evRsp, err := http.Get(prefix + "gdo/events/" + uid)
		handle(err)
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
