package ListaDobleAlumnos

import (
	"Fase1/Estructuras/PilaAcciones"
	"Fase1/Objetos"
	"fmt"
	"github.com/jedib0t/go-pretty/table"
	"os"
	"time"
)

type NodoListaDobleAlumno struct {
	Alumno    Objetos.Alumno
	Anterior  *NodoListaDobleAlumno
	Siguiente *NodoListaDobleAlumno
	Acciones PilaAcciones.PilaAccionAlumno
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
	nuevoNodo := &NodoListaDobleAlumno{alumno, nil, nil, PilaAcciones.PilaAccionAlumno{}}
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

	t := table.NewWriter()
	t.SetOutputMirror(os.Stdout)
	t.AppendHeader(table.Row{"Nombre", "Registro académico"})
	for actual != nil{
		//fmt.Println("Carné: ", actual.Alumno.Id, "Nombre: ", actual.Alumno.Name, "Password: ", actual.Alumno.Password)
		t.AppendRow([]interface{}{actual.Alumno.Name, actual.Alumno.Id})
		actual = actual.Siguiente
	}
	t.Render()

}

func (L *ListaDobleAlumno) RecorrerFull() {
	actual := L.Primero
	if actual == nil{
		fmt.Println("Lista vacía")
		return
	}

	for actual != nil{
		fmt.Println("Alumno: " ,actual.Alumno.Name, "carnet: ", actual.Alumno.Id)
		actual.Acciones.Recorrer()
		actual = actual.Siguiente
	}


}


func (L *ListaDobleAlumno) CheckUser(iden int, pass string) bool{
	actual := L.Primero

	for actual != nil{
		if actual.Alumno.Id == iden && actual.Alumno.Password == pass{
			fmt.Println("Se ha registrado tu inicio de sesión, bienvenido: ", actual.Alumno.Name)
			actual.Acciones.ApilarAccionAlumno(Objetos.AccionAlumno{Date:geTime(), Accion: "Inicio de sesión"})
			return true
		}
		actual = actual.Siguiente
	}
	return false
}

func geTime () string{
	return time.Now().Format("02-01-2006 15:04:05")
}

