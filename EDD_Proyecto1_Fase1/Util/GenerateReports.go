package Util

import (
	"Fase1/Objetos"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strconv"
)

func GenerateData(){
	os.MkdirAll("Reportes", os.ModePerm)
	if ListaDobleAceptados.Size !=0 {
		reporteAlumnos()
		createJson()
	}
	if ColaDeAlumnos.Size != 0{
		reporteCola()
	}
	if PilaAccionesHechasAdmin.Size !=0 {
		stackAdmin()
	}
}

func reporteAlumnos(){
	var contenido string
	contenido = `digraph G {
  node [shape=box, fixedsize=true, width=3, height = 2]
`
	actual := ListaDobleAceptados.Primero
	for i := 0; i <ListaDobleAceptados.Size ; i++ {
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

	for i := 0; i <ListaDobleAceptados.Size ; i++ {
		if i != ListaDobleAceptados.Size-1 {
			contenido += "alumno" + strconv.Itoa(i) + "->"
		}else {
			contenido += "alumno" + strconv.Itoa(i)
		}
	}
	contenido+= "\n"

	for i := ListaDobleAceptados.Size-1; i >=0 ; i -- {
		if i != 0 {
			contenido += "alumno" + strconv.Itoa(i) + "->"
		}else {
			contenido += "alumno" + strconv.Itoa(i)
		}
	}
	contenido+= "\n"
	contenido += "{rank = same;"
	for i := 0; i <ListaDobleAceptados.Size ; i++ {
		if i != ListaDobleAceptados.Size-1{
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


func reporteCola(){
	var contenido string
	contenido = `digraph G {
  node [shape=box, fixedsize=true, width=3, height = 1]
 rankdir=LR;
`
actual := ColaDeAlumnos.Primero
	for i := 0; i <ColaDeAlumnos.Size ; i++ {
		contenido += "alumno" + strconv.Itoa(i) + "[label = \"" + actual.Alumno.Name +"\\n"+ strconv.Itoa(actual.Alumno.Id)+ "\"];\n"
		actual = actual.Siguiente
	}

	for i := ColaDeAlumnos.Size-1; i >=0 ; i -- {
		if i != 0 {
			contenido += "alumno" + strconv.Itoa(i) + "->"
		}else {
			contenido += "alumno" + strconv.Itoa(i)
		}
	}
	contenido += "\n}"

	//-------------------------------------------------------------------------

	f, err := os.Create("Reportes/colaAlumnos.dot")
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
	fmt.Println(l, "Se creo el reporte de final")
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}

	cmd := exec.Command("dot", "-Tpng", "Reportes/colaAlumnos.dot" ,"-o", "Reportes/colaAlumnos.png")

	err = cmd.Run()

	if err != nil {
		log.Fatal(err)
	}


}

func stackAdmin(){
	actual := PilaAccionesHechasAdmin.Primero
	var contenido string
	contenido = `digraph G {

  node [shape=record]
  
`

	contenido += "accion[label=\"{ "
	var subcadena string = ""
	for j := 0; j <PilaAccionesHechasAdmin.Size ; j++ {
		if j==PilaAccionesHechasAdmin.Size-1 {
			subcadena += actual.Acccion.Status +"\\n" +actual.Acccion.Date + "\\n" + actual.Acccion.NameStudent +"\\n" + strconv.Itoa(actual.Acccion.Idstudent)
		}else{
			subcadena += actual.Acccion.Status +"\\n" +actual.Acccion.Date + "\\n" + actual.Acccion.NameStudent +"\\n" + strconv.Itoa(actual.Acccion.Idstudent) + "|"
		}
		actual = actual.Siguiente
	}
	contenido += subcadena
	contenido+=  "}\"];"

	contenido += "\n}"

	f, err := os.Create("Reportes/accionesAdmin.dot")
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
	fmt.Println(l, "Se creo el reporte de acciones del administrador")
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}

	cmd := exec.Command("dot", "-Tpng", "Reportes/accionesAdmin.dot" ,"-o", "Reportes/accionesAdmin.png")

	err = cmd.Run()

	if err != nil {
		log.Fatal(err)
	}
}

func createJson(){
	actual := ListaDobleAceptados.Primero
	var n int = ListaDobleAceptados.Size
	s := make([]Objetos.Alumno, n)
	for i := 0; i <ListaDobleAceptados.Size ; i++ {
		s[i] = actual.Alumno
		actual = actual.Siguiente
	}

	type final struct {
		Alumnos []Objetos.Alumno
	}

	//f2 := final{alumnos: s}
	//file, err := json.Marshal(final{Alumnos: s})
	//if err != nil {
	//	panic(err)
	//}

	file, _ := json.MarshalIndent(final{Alumnos: s}, "", " ")

	_ = ioutil.WriteFile("Reportes/alumnos.json", file, 0644)

}