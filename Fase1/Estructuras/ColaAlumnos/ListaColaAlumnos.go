package ColaAlumnos

import (
	"Fase1/Objetos"
	"fmt"
)

type NodoListaColaAlumnos struct {
	Alumno    Objetos.Alumno
	Anterior  *NodoListaColaAlumnos
	Siguiente *NodoListaColaAlumnos
}

type ListaColaAlumnos struct {
	Size int
	Primero *NodoListaColaAlumnos
	Ultimo *NodoListaColaAlumnos
}

func InicializarColaAlumnos() *ListaColaAlumnos{
	return &ListaColaAlumnos{}
}

func (L *ListaColaAlumnos) AgregaNodoFin(alumno Objetos.Alumno){
	nuevoNodo := &NodoListaColaAlumnos{alumno, nil, nil}
	if L.Primero == nil{
		L.Primero = nuevoNodo
		L.Ultimo = nuevoNodo

	} else{
		nuevoNodo.Anterior = L.Ultimo
		L.Ultimo.Siguiente = nuevoNodo
		L.Ultimo = nuevoNodo
	}
	L.Size++
	return
}

func (L *ListaColaAlumnos) Recorrer() {
	actual := L.Primero
	if actual == nil{
		fmt.Println("Lista vacía")
		return
	}

	for actual != nil{
		fmt.Println("Carné: ", actual.Alumno.Id, "Nombre: ", actual.Alumno.Name, "Password: ", actual.Alumno.Password)
		actual = actual.Siguiente
	}

}

func (L *ListaColaAlumnos) Desencolar(){
	if L.Size == 1{
		L.Primero = nil
		L.Ultimo = nil
		L.Size--
		return
	}
	L.Primero = L.Primero.Siguiente
	L.Primero.Anterior = nil
	L.Size--
}


func (L *ListaColaAlumnos) Existing(identifier int) bool  {
	actual := L.Primero
	if actual == nil{
		return false
	}
	for actual != nil{
		if actual.Alumno.Id == identifier {
			return true
		}
		actual = actual.Siguiente
	}

	return false
}