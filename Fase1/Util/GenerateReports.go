package Util

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
)

func GenerateData(){
	os.MkdirAll("Reportes", os.ModePerm)
	if ListaDobleAceptados.Size !=0 {
		reporteAlumnos()
	}
}

func reporteAlumnos(){
	var contenido string
	contenido = `digraph G {
  node [shape=box, fixedsize=true, width=3, height = 2]
`
	actual := ListaDobleAceptados.Primero
	for i := 0; i <ListaDobleAceptados.Size+1 ; i++ {
		contenido += "alumno" + strconv.Itoa(i) + "[label = \"" + actual.Alumno.Name +"\\n"+ strconv.Itoa(actual.Alumno.Id)+ "\"];\n"
		var subcadena = ""
		actualAcciones := actual.Acciones.Primero
		for j := 0; j <actual.Acciones.Size ; j++ {
			if j==actual.Acciones.Size-1 {
				subcadena += actualAcciones.Acccion.Accion +"\\n" +actualAcciones.Acccion.Date
			}else{
				subcadena += actualAcciones.Acccion.Accion + "\\n" +actualAcciones.Acccion.Date +"|"
			}
			actualAcciones= actualAcciones.Siguiente
		}
		contenido += "accion"+ strconv.Itoa(i)+ "[label=\"{" + subcadena +"}\" shape=record];\n"
		actual = actual.Siguiente
		contenido += "alumno" + strconv.Itoa(i) + "->" + "accion" + strconv.Itoa(i) + "\n"
	}

	for i := 0; i <ListaDobleAceptados.Size+1 ; i++ {
		if i != ListaDobleAceptados.Size {
			contenido += "alumno" + strconv.Itoa(i) + "->"
		}else {
			contenido += "alumno" + strconv.Itoa(i)
		}
	}
	contenido+= "\n"

	for i := ListaDobleAceptados.Size; i >=0 ; i -- {
		if i != 0 {
			contenido += "alumno" + strconv.Itoa(i) + "->"
		}else {
			contenido += "alumno" + strconv.Itoa(i)
		}
	}
	contenido+= "\n"
	contenido += "{rank = same;"
	for i := 0; i <ListaDobleAceptados.Size+1 ; i++ {
		if i != ListaDobleAceptados.Size{
			contenido += "alumno" +strconv.Itoa(i) + ","
		}else {
			contenido += "alumno" + strconv.Itoa(i) + "}"
		}
	}

	contenido+= "\n"


	contenido+= "\n}"


	f, err := os.Create("Reportes/alumnos.dot")
	if err != nil {
		fmt.Println(err)
		return
	}
	l, err := f.WriteString(contenido)
	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}
	fmt.Println(l, "Se creo el reporte de alumnos")
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}

	cmd := exec.Command("dot", "-Tpng", "Reportes/alumnos.dot" ,"-o", "Reportes/alumnos.png")

	err = cmd.Run()

	if err != nil {
		log.Fatal(err)
	}
}
