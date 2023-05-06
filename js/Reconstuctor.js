import Student from "./Student.js";
import NaryTree from "./NaryTree.js";
import AvlNode from "./AvlNode.js";
import N_aryNode from "./N_aryNode.js";
import AVL from "./AVL.js";
import CircularList from "./CircularList.js";
import Action from "./Action.js";
import HeaderNode from "./HeaderNode.js";
import InternalNode from "./InternalNode.js";
import Graph from "./FolderGraph.js";
import {desencriptacion} from "./Encrypter.js";
import {Bloque, nodoBloque} from "./BlockChain.js";



export function reBuildTree(){
    let json_tree = JSON.parse(localStorage.getItem("jsonArbol"))
    let arbolito = new AVL()
    arbolito.root = recreateTree(json_tree.root)
    return arbolito
}


function recreateTree(json) {
    if (!json) return null;

    const student = recreateStudent(json.student)
    const left = recreateTree(json.left);
    const right = recreateTree(json.right);
    let nuevo_nodo = new AvlNode(student)
    nuevo_nodo.left = left
    nuevo_nodo.right = right
    nuevo_nodo.height = json.height

    return nuevo_nodo;
}

function recreateStudent(jsonStudent){
    let grafito = new Graph()
    let new_student = new Student(jsonStudent.id, jsonStudent.name, jsonStudent.password)
    new_student.bitacora = recreateBitacora(jsonStudent.bitacora.first2)
    new_student.rootFolder = recreateNary(new_student.bitacora)
    new_student.rootFolder.generateGraph(new_student.rootFolder.root, grafito)
    new_student.graph = grafito
    return new_student
}

function recreateBitacora(head){
    let bitacora = new CircularList()
    if (!head) {
        return bitacora;
    }

    let actual = head
    while(actual){
        //console.log(actual.action.path)
        let new_action = new Action(actual.action.action, actual.action.date, actual.action.type, actual.action.content, actual.action.name, actual.action.path, actual.action.path2)
        bitacora.insertAction(new_action)
        actual = actual.next2
    }
    return bitacora
}


function recreateNary(bitacora){
    let nary = new NaryTree()
    let actual = bitacora.first1
    if (actual === null) return nary

    //console.log(actual)
    if (actual.action.type === "folderCreation"){
        nary.insert_folder(actual.action.path, actual.action.name)
    }

    if (actual.action.type === "folderDeletion"){
        nary.delete(actual.action.path)
    }


    while (actual.next1 !== bitacora.first1){
        actual = actual.next1
        //console.log(actual)
        if (actual.action.type === "folderCreation"){
            nary.insert_folder(actual.action.path, actual.action.name)
        }
        else if (actual.action.type === "folderDeletion"){
            nary.delete(actual.action.path)
        }
        else if (actual.action.type === "fileAdition"){
            let headerNew = new HeaderNode(actual.action.name)
            let path = actual.action.path
            headerNew.content =actual.action.content
            if (path === "/"){
                headerNew.abs_path = "/"  + headerNew.id
            }
            else{
                headerNew.abs_path = path  + "/" + headerNew.id
            }

            nary.getFolder(path).matrix.rows.insert(headerNew)
        }

        else if (actual.action.type === "permission"){
            //console.log(actual)
            let nuevo_interno = new InternalNode(actual.action.name, actual.action.path, actual.action.content)
            nary.getFolder(actual.action.path2).matrix.insert(nuevo_interno)
        }
        else if (actual.action.type === "fileDeletion"){
            // console.log(actual)
            nary.getFolder(actual.action.name).matrix.rows.delete(actual.action.path)

        }
    }



    return nary
}


function recreateFolderList(jsonLinkedList){
    if (!jsonLinkedList) {
        return null;
    }
    const head = new N_aryNode(jsonLinkedList.path, jsonLinkedList.id, jsonLinkedList.type)
    if (jsonLinkedList.first !== null){
        head.first = recreateFileList(jsonLinkedList.first)
    }
    return head;
}


function recreateFileList(jsonLinkedList){
    if (!jsonLinkedList) {
        return null;
    }
    let head = new N_aryNode(jsonLinkedList.path, jsonLinkedList.id, jsonLinkedList.type)
    head.content = jsonLinkedList.content
    head.absolute_path = jsonLinkedList.absolute_path
    head.next = recreateFileList(jsonLinkedList.next)
    head.first = recreateFileList(jsonLinkedList.first)
    return head
}


export function returnStudentNode(root, id){
    if (root == null) return false
    // obtaining root from tree
    let current_identifier = root.student.id
    if (id === current_identifier) {
        localStorage.setItem("logged_user", JSON.stringify(root.student, replacer))
        return root.student
    }
    if (id > current_identifier) return returnStudentNode(root.right, id)
    if (id < current_identifier) return returnStudentNode(root.left, id)

}


export function hashreturnStudentNode(hashTable, id){
        for (let i = 0; i <hashTable.length ; i++) {
            if (hashTable[i]){
                if (hashTable[i].id === id ){
                    return  hashTable[i]

                }

            }

        }
        return null




}

export function cargarListaDesdeJSON(){
    const data = JSON.parse(localStorage.getItem('blockChain'));
    const lista = new Bloque();

    if(data.inicio){
        lista.inicio = new nodoBloque(
            data.inicio.valor.index,
            data.inicio.valor.timestamp,
            data.inicio.valor.transmitter,
            data.inicio.valor.receiver,
            data.inicio.valor.message,
            data.inicio.valor.previoushash,
            data.inicio.valor.hash
        );
        let aux = lista.inicio;

        let siguiente = data.inicio.siguiente;
        while(siguiente){
            aux.siguiente = new nodoBloque(
                siguiente.valor.index,
                siguiente.valor.timestamp,
                siguiente.valor.transmitter,
                siguiente.valor.receiver,
                siguiente.valor.message,
                siguiente.valor.previoushash,
                siguiente.valor.hash
            );
            aux.siguiente.anterior = aux;
            aux = aux.siguiente;
            siguiente = siguiente.siguiente;
        }
    }

    lista.bloques_creados = data.bloques_creados;
    return lista;
}




function replacer(key, value){
    if (key==="first1") return undefined;
    else if (key==="next1") return undefined;
    else if (key === "rootFolder") return undefined;
    else return value;
}