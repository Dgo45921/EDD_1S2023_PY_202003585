package Util

import (
	"Fase1/Estructuras/ColaAlumnos"
	"Fase1/Estructuras/ListaDobleAlumnos"
	"Fase1/Estructuras/PilaAcciones"
	"Fase1/Objetos"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
)
var ColaDeAlumnos = ColaAlumnos.InicializarColaAlumnos() // acá se llevará el registro de final pendientes
var ListaDobleAceptados = ListaDobleAlumnos.InicializarListaDobleAlumnos() // acá se llevara el registro de final aceptados
var PilaAccionesHechasAdmin = PilaAcciones.InicializarPilaAccionesAdmin()
func LeerCsv(path string) {
	fd, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
	}
	defer fd.Close()

	// Lee el csv
	fileReader := csv.NewReader(fd)
	dataStudents, err := fileReader.ReadAll()
	if err != nil {
		fmt.Println(err)
	}
	// fmt.Println(len(dataStudents))
	// fmt.Println(dataStudents)

	for i := 1; i <len(dataStudents) ; i++ {
		carne, err := strconv.Atoi(dataStudents[i][0])
		if err == nil{
			if !ColaDeAlumnos.Existing(carne){
				ColaDeAlumnos.AgregaNodoFin(Objetos.Alumno{Id: carne, Name: dataStudents[i][1], Password: dataStudents[i][2], Carpeta_Raiz: "/"})
			}
		} else{
			fmt.Println("Hay problemas con tu archivo csv")
			return
		}
	}

	//ColaDeAlumnos.Recorrer()

}
