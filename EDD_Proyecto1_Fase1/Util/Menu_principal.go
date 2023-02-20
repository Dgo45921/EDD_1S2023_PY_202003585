package Util

import (
	"Fase1/Objetos"
	"bufio"
	"fmt"
	"os"
	"strconv"
	"time"
)


func ShowPrincipalMenu() {
	fmt.Println("Bienvenido")
	var opcion string
	for {
		fmt.Println("**********GoDrive*********")
		fmt.Println("* 1. Login               *")
		fmt.Println("* 2. Reports             *")
		fmt.Println("* 3. Exit                *")
		fmt.Println("**************************")
		fmt.Println("Seleccione una opción: \n ")
		fmt.Scanln(&opcion)
		switch opcion {
		case "1":
			login()
		case "2":
			fmt.Println("reportes")
			GenerateData()
		case "3":
			os.Exit(3)
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
		fmt.Println("\nSi deseas regresar al menú anterior deja algun campo vacio")
		fmt.Println("Ingresa tu usuario: ")
		fmt.Scanln(&username)
		fmt.Println("Ingresa tu password: ")
		fmt.Scanln(&password)
		if username == "" || password == "" {
			ShowPrincipalMenu()
		}

		checkLogin(username, password)
	}
}

func checkLogin(username, password string) {

	if username == "admin" && password == "admin" {
		fmt.Println("Bienvenido administrador")
		menuAdministrator()
	} else{
		var carnet int
		carnet, err := strconv.Atoi(username)

		if err != nil {
			fmt.Println("Ingresa un carnet valido")
			return
		}

		var res = ListaDobleAceptados.CheckUser(carnet, password)
		if res{
			// ListaDobleAceptados.RecorrerFull()
			ShowPrincipalMenu()
		}else {
			fmt.Println("Usuario no encontrado")
			ShowPrincipalMenu()
		}
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
			fmt.Println("Ingrese lo que se le requiere, si desea salir deje algun campo en blanco")
			var name, ls, iden, pass string
			fmt.Println("Ingrese el nombre del alumno: "); fmt.Scanln(&name)
			fmt.Println("Ingrese el apellido del alumno: "); fmt.Scanln(&ls)
			fmt.Println("Ingrese su registro academico: "); fmt.Scanln(&iden)
			fmt.Println("Ingrese la contraseña del alumno: "); fmt.Scanln(&pass)
			if name == "" || ls == "" || iden == "" || pass == "" {
				menuAdministrator()
			}
			var fid int
			if _, err := strconv.Atoi(iden); err == nil {
				fid, _ = strconv.Atoi(iden)
			} else{
				fmt.Println("Ingrese un registro válido")
				menuAdministrator()
			}

			newStudent := Objetos.Alumno{Id: fid, Name: name + " " + ls, Password: pass, Carpeta_Raiz: "/"}
			ColaDeAlumnos.AgregaNodoFin(newStudent)
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
		fmt.Println("No hay final en la cola de espera")
		menuAdministrator()
	}
	fmt.Println("Hay: ", ColaDeAlumnos.Size, " final pendientes")
	fmt.Println("Estudiante actual: ", ColaDeAlumnos.Primero.Alumno.Name, " ", ColaDeAlumnos.Primero.Alumno.Id)
	fmt.Println("¿Qué desea hacer?")
	fmt.Println("1.Aceptar \n2.Rechazar\n3.Salir")
	fmt.Scanln(&opcion)
	switch opcion {
	case "1":
		if ColaDeAlumnos.Size == 0{
			fmt.Println("No hay final en la cola de espera")
			return
		}
		ListaDobleAceptados.AgregaNodo(ColaDeAlumnos.Primero.Alumno)
		var newAction = Objetos.AccionAdmin{Status: "Aceptado", NameStudent: ColaDeAlumnos.Primero.Alumno.Name, Idstudent: ColaDeAlumnos.Primero.Alumno.Id, Date: geTime()}
		PilaAccionesHechasAdmin.Apilar(newAction)
		ColaDeAlumnos.Desencolar()
		//fmt.Println("estado actual de la cola")
		//ColaDeAlumnos.Recorrer()
		//fmt.Println("estado actual de la lista doble de final")
		// ListaDobleAceptados.Recorrer()
		PilaAccionesHechasAdmin.Recorrer()
		showqueue()
	case "2":
		//fmt.Println("estado actual de la cola")
		//ColaDeAlumnos.Recorrer()
		//fmt.Println("estado actual de la lista doble de final")
		//ListaDobleAceptados.Recorrer()
		var newAction = Objetos.AccionAdmin{Status: "Rechazado", NameStudent: ColaDeAlumnos.Primero.Alumno.Name, Idstudent: ColaDeAlumnos.Primero.Alumno.Id, Date: geTime()}
		ColaDeAlumnos.Desencolar()
		PilaAccionesHechasAdmin.Apilar(newAction)
		PilaAccionesHechasAdmin.Recorrer()
		showqueue()
	case "3":
		return
	default:
		fmt.Println("Por favor ingresa una opción válida")
		showqueue()
	}


}

func geTime () string{
	return time.Now().Format("02-01-2006 15:04:05")
}