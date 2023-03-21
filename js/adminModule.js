
import Student from "./Student.js";
import AVL from "./AVL.js";


const load_button = document.getElementById("load_button");
const showStudents_button = document.getElementById("showStudents");
const graphStudentTree_button = document.getElementById("graphStudentTreeButton");
let AVLTree = new AVL()


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


load_button.addEventListener("click", function() {
    load_json()
});


graphStudentTree_button.addEventListener("click", function() {
    if(AVLTree.root === null){
        alert("No hay alumnos cargados al sistema")
        return
    }
    let viz_code = graphTree(AVLTree.root)
    let url = 'https://quickchart.io/graphviz?graph=';
    let tree_image = document.getElementById("studentTree")
    tree_image.setAttribute("src", url+viz_code)


});

showStudents_button.addEventListener("click", function() {

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
        //post
        postOrderTable(AVLTree.root)
    }
    else{
        //pre
        preOrderTable(AVLTree.root)
    }


});




function load_json(){
    console.log("cargo json")
    let fileContainer = document.getElementById("cargaMasiva")
    let file = fileContainer.files[0]
    const fr = new FileReader();
    fr.readAsText(file)
    fr.onload = function (){
        const jsonContent = fr.result;
        //console.log(jsonContent)
        const jsonObject = JSON.parse(jsonContent)
        const studentsArray = jsonObject.Alumnos
        load_students(studentsArray)
    }
}

function load_students(studentsArray){
    AVLTree = new AVL()
    for (let i = 0; i < studentsArray.length ; i++) {
        const id = studentsArray[i].Id;
        const name = studentsArray[i].Name;
        const password = studentsArray[i].Password;
        const rootFolder = studentsArray[i].Carpeta_Raiz;
        const newStudent = new Student(id, name, password, rootFolder);
        //console.log(newStudent)
        AVLTree.root = AVLTree.insertStudent(AVLTree.root, newStudent)
    }
}