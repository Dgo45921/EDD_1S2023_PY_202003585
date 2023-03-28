import AVL from "./AVL.js";
import Student from "./Student.js";
import NaryTree from "./NaryTree.js";
import {reBuildTree} from "./Reconstuctor.js";

let AVLTree = reBuildTree()
let logged_user;

let ruta_actual = "/"

window.gotopath = gotopath
window.createFolder = createFolder
window.deleteFolder = deleteFolder
window.loadFiletoPath = loadFiletoPath
window.log_out = log_out



function log_out() {
    // console.log(window.location.origin)
    window.location.href = window.location.origin + "/EDD_1S2023_PY_202003585/index.html"
}
function getstudentTree(){
    if (localStorage.getItem("jsonArbol") != null){
        let jsonContent = localStorage.getItem("jsonArbol")
        const jsonObject = JSON.parse(jsonContent)
        AVLTree = new AVL()
        AVLTree.root = jsonObject.root
    }
    // AVLTree.preOrder(AVLTree.root)

}

function getLoggedUser(){
    if (localStorage.getItem("logged_user") != null){
        let jsonContent = localStorage.getItem("logged_user")
        const jsonObject = JSON.parse(jsonContent)
        logged_user = Object.assign(Student.prototype, jsonObject);
        logged_user.rootFolder = Object.assign(NaryTree.prototype, jsonObject.rootFolder);
    }
}

function fromb64tofile(base64String, fileName) {
    // Decode the base64 string and convert to Uint8Array
    const decodedArray = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

    // Create a Blob from the Uint8Array
    const blob = new Blob([decodedArray], { type: 'application/pdf' });

    // Create a URL from the Blob
    const url = URL.createObjectURL(blob);

    // Create a new a element and set its attributes
    const a = document.createElement('a');
    a.setAttribute('href', url);


    // Programmatically click the a element to download the file
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
}



function getFileExtension(path){
    return path.split(".")[1]
}

function display_actualFolder(){
    let actual_folder = document.getElementById("actual_folder")
    actual_folder.innerHTML = "path: " + ruta_actual
}


function greetUser (){
    const jsonObject = JSON.parse(localStorage.getItem("logged_user"))
    let message = document.getElementById("message_user")
    message.innerHTML = "Bienvenido " + jsonObject.name
}

function gotopath(){
    const path = document.getElementById("gotopath").value
    console.log(path)
}

function createFolder(){
    const path = document.getElementById("new_folder_path").value
    const name = document.getElementById("new_folder_name").value
    console.log(logged_user.rootFolder.root)
}

function deleteFolder(){
    const path = document.getElementById("delete_path").value
    console.log(path)
}


function loadFiletoPath(){
    let fileContainer = document.getElementById("fileHolder")


    const extension = getFileExtension(fileContainer.value)
    let file = fileContainer.files[0]

    const fr = new FileReader();

    fr.readAsDataURL(file)
    fr.onloadend = () => {
        let b64 = fr.result.split(',')[1]
        //console.log(fr.result)
        console.log(b64)
       // fromb64tofile(b64, "prueba.pdf")
    };

}






console.log(JSON.stringify(AVLTree))
//AVLTree.preOrder(AVLTree.root)
getLoggedUser()
greetUser()
display_actualFolder()




