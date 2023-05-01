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
        StudentHashTable.insert(node.student)
        createHashTableStudents(node.right);
    }

}


const loginButton = document.getElementById("login_button");

loginButton.addEventListener("click", function() {
    login()
});

function findUser(identifier, password, root){
    if (root == null) return false
    // obtaining root from tree
    let current_identifier = root.student.id
    let current_password = root.student.password
    if (identifier === current_identifier && password === current_password) {
        localStorage.setItem("logged_user", JSON.stringify(root.student))
        return true
    }
    if (identifier > current_identifier) return findUser(identifier, password, root.right)
    if (identifier < current_identifier) return findUser(identifier, password, root.left)

}


function login(){
    const username = document.getElementById("username_input").value.replace(" ", "");
    const password = document.getElementById("password_input").value.replace(" ", "");
   // console.log(password)
   // console.log(username)

    if (username === "" || password === "" ){
        alert("Por favor, llene todos los campos")
    }

    else if (username === "admin" && password === "admin" ){
        location.href = 'moduloAdmin.html';
    }
    else{
        if (findUser(parseInt(username), password, AVLTree.root))
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