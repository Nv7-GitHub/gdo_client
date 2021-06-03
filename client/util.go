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
	"syscall"

	"golang.org/x/term"
)

var buf = bufio.NewReader(os.Stdin)

func handle(err error) {
	if err != nil {
		log.Println(err)
	}
}

func input(msg string, ispasswd ...bool) string {
	fmt.Print(msg)
	if len(ispasswd) != 0 {
		pwd, err := term.ReadPassword(int(syscall.Stdin))
		handle(err)
		fmt.Print("\n")
		return string(pwd)
	}
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
