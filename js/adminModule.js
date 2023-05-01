import {reBuildTree} from "./Reconstuctor.js";
import Student from "./Student.js";
import AVL from "./AVL.js";
import HashTable from "./HashTable.js";




let AVLTree;
let StudentHashTable = new HashTable()

window.graphtree= graphtree;
window.show_students=show_students;
window.log_out_admin= log_out_admin;
window.load_json= load_json;



// checking if avl tree already exists
if(localStorage.getItem('jsonArbol')){
    AVLTree = reBuildTree()
    createHashTableStudents(AVLTree.root)
    console.log(StudentHashTable)
    console.log(StudentHashTable.table.length)

}
else{
    AVLTree = new AVL()

}


function createHashTableStudents(node){
    if (node) {
        createHashTableStudents(node.left)
        node.student.password = CryptoJS.SHA256(node.student.password).toString()
        StudentHashTable.insert(node.student)
        createHashTableStudents(node.right);
    }

}

function cleanTable(){
    // cleaning table
    const old_tbody = document.getElementById("studentTableBody")
    const new_tbody = document.createElement('tbody');
    new_tbody.setAttribute("id", "studentTableBody")
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
}

function preOrderTable(node){
    // obtaining body of student table
    let tbody = document.getElementById("studentTableBody")
    if (node != null) {
        const new_row = tbody.insertRow();
        const student_id = new_row.insertCell(0);
        const student_name = new_row.insertCell(1);
        student_id.innerHTML = node.student.id
        student_name.innerHTML = node.student.name
        preOrderTable(node.left);
        preOrderTable(node.right);
    }
}


function inOrderTable(node){
    // obtaining body of student table
    let tbody = document.getElementById("studentTableBody")
    if (node != null) {
        inOrderTable(node.left)
        const new_row = tbody.insertRow();
        const student_id = new_row.insertCell(0);
        const student_name = new_row.insertCell(1);
        student_id.innerHTML = node.student.id
        student_name.innerHTML = node.student.name
        inOrderTable(node.right);
    }
}

function postOrderTable(node){
    // obtaining body of student table
    let tbody = document.getElementById("studentTableBody")
    if (node != null) {
        postOrderTable(node.left)
        postOrderTable(node.right);
        const new_row = tbody.insertRow();
        const student_id = new_row.insertCell(0);
        const student_name = new_row.insertCell(1);
        student_id.innerHTML = node.student.id
        student_name.innerHTML = node.student.name

    }
}

function getNodesGraphviz(node){


    if (node === null){
        return ""
    }

    let codigo_arbol = ""
    codigo_arbol += "nodo" + node.student.id + " [label=\"" + "carnet: " + node.student.id + "\\n" + "nombre: " + node.student.name + "\\n" + "altura: " + node.height + "\"];\n";
    if (node.left != null) {
        codigo_arbol += "nodo" + node.student.id+ " -> " + "nodo" + node.left.student.id + ";\n";
    }
    if (node.right != null) {
        codigo_arbol += "nodo" + node.student.id + " -> " + "nodo" + node.right.student.id + ";\n";
    }
    codigo_arbol += getNodesGraphviz(node.left);
    codigo_arbol += getNodesGraphviz(node.right);

    return codigo_arbol

}


function graphTree(node){
    let cadena = "";
    cadena += "digraph tree  { \n"
    cadena += "fontsize=\"5\"node [ shape=\"record\" ];"
    let intermedio = getNodesGraphviz(node)
    cadena+= intermedio
    cadena += "}"

    return cadena
}




function graphtree() {
    if(AVLTree.root === null){
        alert("No hay alumnos cargados al sistema")
        return
    }
    let viz_code = graphTree(AVLTree.root)
    let url = 'https://quickchart.io/graphviz?graph=';
    let tree_image = document.getElementById("studentTree")
    tree_image.setAttribute("src", url+viz_code)


}

 function show_students() {
    // obtaining index from droplist menu to traverse students
    let dropDownMenu = document.getElementById("traverseOptions")
    let index = dropDownMenu.selectedIndex
    // checking if tree has at least one element
    if(AVLTree.root === null){
        alert("No hay alumnos cargados al sistema")
        return
    }
    // cleaning the student table
    cleanTable()
    if (index === 0){
        // inorder
        inOrderTable(AVLTree.root)
    }
    else if (index === 1){
        //pre
        preOrderTable(AVLTree.root)
    }
    else{
        //post
        postOrderTable(AVLTree.root)
    }


}

function log_out_admin() {
    // console.log(window.location.origin)
    window.location.href = window.location.origin + "/EDD_1S2023_PY_202003585/index.html"
}


function load_json(){
    console.log("cargo json")
    let fileContainer = document.getElementById("cargaMasiva")
    let file = fileContainer.files[0]
    const fr = new FileReader();
    fr.readAsText(file)
    fr.onloadend = function (){
        const jsonContent = fr.result;
        //console.log(jsonContent)
        const jsonObject = JSON.parse(jsonContent)
        const studentsArray = jsonObject.alumnos
        load_students(studentsArray)
        localStorage.setItem("jsonArbol", JSON.stringify(AVLTree))
        alert("Datos cargados con éxito")
    }
    console.log(JSON.stringify(AVLTree))
}

export function load_students(studentsArray){
    AVLTree = new AVL()
    for (let i = 0; i < studentsArray.length ; i++) {
        const id = studentsArray[i].carnet;
        const name = studentsArray[i].nombre;
        const password = studentsArray[i].password;
        const newStudent = new Student(id, name, password);
        //console.log(newStudent)
        AVLTree.root = AVLTree.insertStudent(AVLTree.root, newStudent)
    }
    return AVLTree
}

function check_existingStudents(){
    let arbol = localStorage.getItem("jsonArbol")
    if (arbol!==null){
        const jsonObject = JSON.parse(arbol)
        AVLTree = new AVL()
        AVLTree.root = jsonObject.root
    }

}

check_existingStudents()


