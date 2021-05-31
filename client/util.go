package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
)

var buf = bufio.NewReader(os.Stdin)

func handle(err error) {
	if err != nil {
		log.Println(err)
	}
}

func input(msg string) string {
	fmt.Print(msg)
	inp, _, err := buf.ReadLine()
	handle(err)
	return string(inp)
}

func postJSON(url string, content interface{}) *http.Response {
	cont, err := json.Marshal(content)
	handle(err)
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(cont))
	handle(err)

	return resp
}

func post(url string, content string) *http.Response {
	resp, err := http.Post(url, "text/plain", strings.NewReader(content))
	handle(err)

	return resp
}

func getContent(body *http.Response) string {
	defer body.Body.Close()

	out, err := io.ReadAll(body.Body)
	handle(err)

	return string(out)
}

func unmarshal(data string, out interface{}) {
	err := json.Unmarshal([]byte(data), out)
	handle(err)
}
