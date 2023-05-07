import AVL from "./AVL.js";
import {reBuildTree} from "./Reconstuctor.js";
import HashTable from "./HashTable.js";

let AVLTree
let StudentHashTable = new HashTable()
// checking if avl tree already exists
if(localStorage.getItem('jsonArbol')){
    AVLTree = reBuildTree()
    createHashTableStudents(AVLTree.root)
    console.log(StudentHashTable)

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


const loginButton = document.getElementById("login_button");

loginButton.addEventListener("click", function() {
    login()
});

function findUser(identifier, password){
    for (let i = 0; i <StudentHashTable.table.length ; i++) {
        if (StudentHashTable.table[i]){
            if (StudentHashTable.table[i].id === identifier && StudentHashTable.table[i].password === password){
                localStorage.setItem("logged_user", JSON.stringify(StudentHashTable.table[i], replacer))
                return true
            }

        }


    }
    return false

}

function replacer(key, value) {
    if (key === "first1") return undefined;
    else if (key === "next1") return undefined;
    else if (key === "rootFolder") return undefined;
    else if (key === "graph") return undefined;
    else return value;
}




// -------------New login function------------------------
function login(){
    const username = document.getElementById("username_input").value
    const password = document.getElementById("password_input").value
   // console.log(password)
   // console.log(username)

    if (username === "" || password === "" ){
        alert("Por favor, llene todos los campos")
    }

    else if (username === "admin" && password === "admin" ){
        location.href = 'moduloAdmin.html';
    }
    else{
        if (findUser(parseInt(username), CryptoJS.SHA256(password.toString()).toString()))
            location.href = 'moduloUser.html';

        else{
            alert("Usuario no encontrado")
        }
    }


}



function check_students(){
    if (localStorage.getItem("jsonArbol")){
        let jsonContent = localStorage.getItem("jsonArbol")
        const jsonObject = JSON.parse(jsonContent)
        AVLTree = new AVL()
        AVLTree.root = jsonObject.root
    }
    // AVLTree.preOrder(AVLTree.root)


}


check_students()