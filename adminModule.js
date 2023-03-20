
import Student from "./Student.js";
import AVL from "./AVL.js";

const load_button = document.getElementById("load_button");

load_button.addEventListener("click", function() {
    load_json()
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
   const AVLTree = new AVL()

    for (let i = 0; i < studentsArray.length ; i++) {
        const id = studentsArray[i].Id;
        const name = studentsArray[i].Name;
        const password = studentsArray[i].Password;
        const rootFolder = studentsArray[i].Carpeta_Raiz;
        const newStudent = new Student(id, name, password, rootFolder);
        //console.log(newStudent)
        AVLTree.root = AVLTree.insertStudent(AVLTree.root, newStudent)
    }

    AVLTree.preOrder(AVLTree.root)
}