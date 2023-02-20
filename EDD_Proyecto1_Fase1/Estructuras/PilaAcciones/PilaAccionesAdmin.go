package PilaAcciones

import (
	"Fase1/Objetos"
	"fmt"
	"github.com/jedib0t/go-pretty/table"
	"os"
)


type NodoPilaAccionesAdmin struct {
	Acccion Objetos.AccionAdmin
	Anterior  *NodoPilaAccionesAdmin
	Siguiente *NodoPilaAccionesAdmin
}

type PilaAccionAdmin struct {
	Primero *NodoPilaAccionesAdmin
	Ultimo *NodoPilaAccionesAdmin
	Size int
}


func InicializarPilaAccionesAdmin () *PilaAccionAdmin{
	return &PilaAccionAdmin{}
}

func (L *PilaAccionAdmin) Apilar(accion Objetos.AccionAdmin){
	nuevoNodo := &NodoPilaAccionesAdmin{accion, nil, nil}
	if L.Primero == nil{
		L.Primero = nuevoNodo
		L.Ultimo = nuevoNodo

	} else{
		nuevoNodo.Siguiente = L.Primero
		L.Primero.Anterior = nuevoNodo
		L.Primero = nuevoNodo
	}
	L.Size++
	return
}

func (L *PilaAccionAdmin) Recorrer() {
	actual := L.Primero
	if actual == nil{
		fmt.Println("Lista vacía")
		return
	}

	t := table.NewWriter()
	t.SetOutputMirror(os.Stdout)
	t.AppendHeader(table.Row{"Status", "Nombre", "Registro académico", "Fecha y hora"})
	for actual != nil{
		//fmt.Println("Carné: ", actual.Alumno.Id, "Nombre: ", actual.Alumno.Name, "Password: ", actual.Alumno.Password)
		t.AppendRow([]interface{}{actual.Acccion.Status, actual.Acccion.NameStudent, actual.Acccion.Idstudent, actual.Acccion.Date})
		actual = actual.Siguiente
	}
	t.Render()

}

