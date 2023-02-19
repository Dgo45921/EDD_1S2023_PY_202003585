package Util

import (
	"bufio"
	"fmt"
	"os"
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
		menuAdministrator()
	}
	if username == "" && password == "" {
		ShowPrincipalMenu()
	}
}

func menuAdministrator() {
	var opcion string
	for {
		fmt.Println("*****Modulo de administrador*****")
		fmt.Println("* 1. Estudiantes pendientes     *")
		fmt.Println("* 2. Estudiantes del sistema    *")
		fmt.Println("* 3. Registrar estudiante       *")
		fmt.Println("* 4. Carga masiva estudiantes   *")
		fmt.Println("* 5. Cerrar sesión              *")
		fmt.Println("*********************************")
		fmt.Scanln("Escoge una opción: ")
		fmt.Scanln(&opcion)

		switch opcion {
		case "1":
			fmt.Println("Estudiantes pendientes")
		case "2":
			fmt.Println("Estudiantes del sistema")
		case "3":
			fmt.Println("Registrar estudiante")
		case "4":
			fmt.Println("Carga masiva")
			scanner := bufio.NewScanner(os.Stdin)
			if scanner.Scan() {
				ruta := scanner.Text()
				//fmt.Printf("la ruta dada fue: %q\n", ruta)
				LeerCsv(ruta)
				ColaDeAlumnos.Recorrer()
			}

		case "5":
			ShowPrincipalMenu()
		default:
			fmt.Println("Por favor ingrese una opción válida")
		}

	}

}
