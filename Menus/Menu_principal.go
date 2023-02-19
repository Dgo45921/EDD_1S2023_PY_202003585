package Menus

import (
	"fmt"
)

func ShowPrincipalMenu() {
	fmt.Println("Bienvenido")
	var opcion string
ciclo:
	for {
		fmt.Println("**********GoDrive*********")
		fmt.Println("* 1. Login               *")
		fmt.Println("* 2. Exit                *")
		fmt.Println("**************************")
		fmt.Println("Seleccione una opción: \n ")
		fmt.Scanln(&opcion)
		switch opcion {
		case "1":
			login()
		case "2":
			break ciclo
		default:
			fmt.Println("Por favor ingrese una opción válida")
		}
	}
}

func login() {
	var username string
	var password string
	for {
		username = ""
		password = ""
		fmt.Println("\n Si deseas regresar al menú anterior deja los dos campos vacíos")
		fmt.Println("Ingresa tu usuario: ")
		fmt.Scanln(&username)
		fmt.Println("Ingresa tu password: ")
		fmt.Scanln(&password)
		checkLogin(username, password)
	}
}

func checkLogin(username, password string) {

	if username == "admin" && password == "admin" {
		fmt.Println("Bienvenido administrador")
	}
	if username == "" && password == "" {
		ShowPrincipalMenu()
	}
}
