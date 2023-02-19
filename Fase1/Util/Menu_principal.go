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
		fmt.Println("\nSi deseas regresar al menú anterior deja los dos campos vacíos")
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
			showqueue()
		case "2":
			fmt.Println("Estudiantes del sistema")
			ListaDobleAceptados.Recorrer()
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
				//ColaDeAlumnos.Desencolar()
				//ColaDeAlumnos.Recorrer()
			}

		case "5":
			ShowPrincipalMenu()
		default:
			fmt.Println("Por favor ingrese una opción válida")
		}

	}

}


func showqueue(){
	var opcion string
	// fmt.Println("***Estudiantes pendientes****")
	if ColaDeAlumnos.Size == 0{
		fmt.Println("No hay alumnos en la cola de espera")
		menuAdministrator()
	}
	fmt.Println("Hay: ", ColaDeAlumnos.Size, " alumnos pendientes")
	fmt.Println("Estudiante actual: ", ColaDeAlumnos.Primero.Alumno.Name, " ", ColaDeAlumnos.Primero.Alumno.Id)
	fmt.Println("¿Qué desea hacer?")
	fmt.Println("1.Aceptar \n2.Rechazar\n3.Salir")
	fmt.Scanln(&opcion)
	switch opcion {
	case "1":
		if ColaDeAlumnos.Size == 0{
			fmt.Println("No hay alumnos en la cola de espera")
			return
		}
		ListaDobleAceptados.AgregaNodo(ColaDeAlumnos.Primero.Alumno)
		ColaDeAlumnos.Desencolar()
		//fmt.Println("estado actual de la cola")
		//ColaDeAlumnos.Recorrer()
		fmt.Println("estado actual de la lista doble de alumnos")
		ListaDobleAceptados.Recorrer()
		showqueue()
	case "2":
		ColaDeAlumnos.Desencolar()
		//fmt.Println("estado actual de la cola")
		//ColaDeAlumnos.Recorrer()
		//fmt.Println("estado actual de la lista doble de alumnos")
		//ListaDobleAceptados.Recorrer()
		showqueue()
	case "3":
		return
	default:
		fmt.Println("Por favor ingresa una opción válida")
		showqueue()
	}


}