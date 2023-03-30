import Student from "./Student.js";
import NaryTree from "./NaryTree.js";
import AvlNode from "./AvlNode.js";
import N_aryNode from "./N_aryNode.js";
import AVL from "./AVL.js";


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
    let new_student = new Student(jsonStudent.id, jsonStudent.name, jsonStudent.password)
    new_student.rootFolder = recreateRootFolder(jsonStudent.rootFolder)
    return new_student
}

function recreateRootFolder(jsonRootFolder){
    let nario = new NaryTree()
    nario.nodo_creados = jsonRootFolder.nodo_creados
    nario.root = recreateFolderList(jsonRootFolder.root)
    return nario
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
        localStorage.setItem("logged_user", JSON.stringify(root.student))
        return root.student
    }
    if (id > current_identifier) return returnStudentNode(root.right, id)
    if (id < current_identifier) return returnStudentNode(root.left, id)

}
