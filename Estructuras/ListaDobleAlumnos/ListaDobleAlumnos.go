package ListaDobleAlumnos

import (
	"Fase1/Objetos"
	"fmt"
)

type NodoListaDobleAlumno struct {
	Alumno    Objetos.Alumno
	Anterior  *NodoListaDobleAlumno
	Siguiente *NodoListaDobleAlumno
}

type ListaDobleAlumno struct {
	Size int
	Primero *NodoListaDobleAlumno
	Ultimo *NodoListaDobleAlumno
}

func InicializarListaDobleAlumnos () *ListaDobleAlumno{
	return &ListaDobleAlumno{}
}

func (L *ListaDobleAlumno) AgregaNodo(alumno Objetos.Alumno){
	nuevoNodo := &NodoListaDobleAlumno{alumno, nil, nil}
	if L.Primero == nil{
		L.Primero = nuevoNodo
		L.Ultimo = nuevoNodo
		return
	} else{

		//Caso en que su carné es el más pequeño
		if alumno.Id < L.Primero.Alumno.Id{
			nuevoNodo.Siguiente = L.Primero
			L.Primero.Anterior = nuevoNodo
			L.Primero = nuevoNodo
			L.Size++
			return
		}
		//Caso en el que su carné sea el mas grande
		if alumno.Id > L.Ultimo.Alumno.Id {
			nuevoNodo.Anterior = L.Ultimo
			L.Ultimo.Siguiente = nuevoNodo
			L.Ultimo = nuevoNodo
			L.Size++
			return
		}
		//Caso en el que su carné esté entre dos nodos
		actual := L.Primero
		for actual!=nil {
			if alumno.Id>actual.Alumno.Id && alumno.Id < actual.Siguiente.Alumno.Id {
				nuevoNodo.Siguiente = actual.Siguiente
				nuevoNodo.Anterior = actual
				actual.Siguiente = nuevoNodo
				actual.Siguiente.Anterior = nuevoNodo
				L.Size++
				return
			}
			actual = actual.Siguiente
		}
		
		
	}

}


func (L *ListaDobleAlumno) Recorrer() {
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

