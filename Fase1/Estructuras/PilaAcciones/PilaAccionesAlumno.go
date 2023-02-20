package PilaAcciones

import (
	"Fase1/Objetos"
	"fmt"
)

type NodoPilaAccionesAlumno struct {
	Acccion Objetos.AccionAlumno
	Anterior  *NodoPilaAccionesAlumno
	Siguiente *NodoPilaAccionesAlumno
}

type PilaAccionAlumno struct {
	Primero *NodoPilaAccionesAlumno
	Ultimo *NodoPilaAccionesAlumno
	Size int
}


func (L *PilaAccionAlumno) ApilarAccionAlumno(accion Objetos.AccionAlumno){
	nuevoNodo := &NodoPilaAccionesAlumno{accion, nil, nil}
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

func (L *PilaAccionAlumno) Recorrer(){
	actual := L.Primero
	if actual == nil{
		fmt.Println("Lista vacía")
		return
	}

	for actual != nil{
		fmt.Println("Accion: " ,actual.Acccion.Accion, "Fecha: ", actual.Acccion.Date)
		actual = actual.Siguiente
	}

}

