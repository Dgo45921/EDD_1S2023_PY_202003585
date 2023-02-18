package Menus

import "fmt"

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
	fmt.Println("Hola, logueate \n ")
}
