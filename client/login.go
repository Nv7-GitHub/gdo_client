package main

import (
	"fmt"
	"os"
	"strings"
)

type loginResp struct {
	Data    string `json:"data"`
	Success bool   `json:"success"`
}

func login() string {
	url := prefix + "login_user/"

	create := input("Register? (y/n): ")
	if strings.Contains(strings.ToLower(create), "y") {
		url = prefix + "create_user/"
	}

	username := input("Username: ")
	password := input("Password: ")
	fmt.Println("Logging in...")

	cont := getContent(post(url+username, password))
	var resp loginResp
	unmarshal(cont, &resp)

	if !resp.Success {
		fmt.Println("Error:", resp.Data)
		os.Exit(0)
	}

	fmt.Println("Logged in!")

	return resp.Data
}
