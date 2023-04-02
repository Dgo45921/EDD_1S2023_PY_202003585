import {reBuildTree, returnStudentNode} from "./Reconstuctor.js";
import Action from "./Action.js";
import InternalNode from "./InternalNode.js";
import HeaderNode from "./HeaderNode.js";



let AVLTree = reBuildTree()
let logged_user = returnStudentNode(AVLTree.root, JSON.parse(localStorage.getItem("logged_user")).id);
let current_folder = logged_user.rootFolder.root
const hyperlinks = document.getElementsByTagName("a");
let bitacora = logged_user.bitacora




window.gotopath = gotopath
window.createFolder = createFolder
window.deleteFolder = deleteFolder
window.loadFiletoPath = loadFiletoPath
window.log_out = log_out
window.graphnary = graphnary

function graphnary(){
    let viz_code = logged_user.rootFolder.graph_nary()
    let url = 'https://quickchart.io/graphviz?graph=';
    let tree_image = document.getElementById("NaryGraph")
    tree_image.setAttribute("src", url+viz_code)
    //console.log(viz_code)
}

function graphBitacora(){
   if (bitacora && bitacora.size >0){
       let viz_code = bitacora.getVizCode()
       let url = 'https://quickchart.io/graphviz?graph=';
       let bita = document.getElementById("imagenbita")
       bita.setAttribute("src", url+viz_code)
       //console.log(viz_code)
       //console.log(url+viz_code)
   }

}



function log_out() {
    window.location.href = window.location.origin + "/EDD_1S2023_PY_202003585/index.html"
}


function fromb64tofile(base64String, type, filename) {
    // Decode the base64 string and convert to Uint8Array
    const decodedArray = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

    // Create an XMLHttpRequest to download the PDF as a blob
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data:application/' + type + ';base64,' + base64String);
    xhr.responseType = 'blob';
    xhr.onload = function() {
        // Create a URL from the Blob
        const blob = xhr.response;
        const url = URL.createObjectURL(blob);

        // Open the Blob in a new window/tab with a custom name
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
    };
    xhr.send();
}



function display_actualFolder(){
    let actual_folder = document.getElementById("actual_folder")
    actual_folder.innerHTML = "path: " + current_folder.absolute_path
    let current_file = current_folder.first
    let list_files = document.getElementById("file_list")
    list_files.innerHTML = ""
    while (current_file){


        let li = document.createElement('li');
        li.setAttribute('class','media my-3');
        list_files.appendChild(li);

        let img = document.createElement('img');
        img.setAttribute("height", "30")
        img.setAttribute("class", "mr-3")

        img.setAttribute("src", "img/folder.png")


        li.appendChild(img)

        let div = document.createElement('media-body');
        li.appendChild(div)
        let a = document.createElement("a")
        a.setAttribute("href", "#")
        a.setAttribute("abs_path", current_file.absolute_path)
        a.innerHTML = current_file.path
        div.appendChild(a)




        current_file = current_file.next
    }

    let li = document.createElement('li');
    li.setAttribute('class','media my-3');
    list_files.appendChild(li);
    let div = document.createElement('media-body');
    li.appendChild(div)
    let a = document.createElement("a")
    a.setAttribute("href", "#")
    a.setAttribute("abs_path", "/")
    a.innerHTML = "Root"
    div.appendChild(a)
    updateHyperLinks()
}


function greetUser (){
    const jsonObject = JSON.parse(localStorage.getItem("logged_user"))
    let message = document.getElementById("message_user")
    message.innerHTML = "Bienvenido " + jsonObject.name
}

function gotopath(){


    const path = document.getElementById("gotopath").value
    //console.log(path)
    if (path === "/"){
        current_folder = logged_user.rootFolder.root
        display_actualFolder()
        return
    }

    let foundFolder = logged_user.rootFolder.getFolder(path)
    if (!foundFolder) {
        alert("Carpeta no encontrada")
    }
    else{
        current_folder = foundFolder
        display_actualFolder()
    }
    updateHyperLinks()
}

function getDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) mm = '0' + hh;
    if (minutes < 10) mm = '0' + minutes;
    if (seconds < 10) mm = '0' + seconds;

    return dd + '/' + mm + '/' + yyyy + '/ ' + hh + ':' + minutes  + ':' + seconds
}


function createFolder(){
    const path = document.getElementById("new_folder_path").value
    const name = document.getElementById("new_folder_name").value

    if (logged_user.rootFolder.insert_folder(name, path)){
        display_actualFolder()
        updateHyperLinks()
        let new_action = new Action("Se creó carpeta: " + name + " en el directorio: " + path, getDate(), "folderCreation", "", path, name)
        bitacora.insertAction(new_action)
        graphBitacora()
        localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))

    }
    else alert("No se pudo agregar la carpeta, revise la ruta")
    // console.log(JSON.stringify(bitacora, replacer))
    // localStorage.setItem("bitacora", JSON.stringify(bitacora, replacer))
}

function replacer(key, value){
    if (key==="first1") return undefined;
    else if (key==="next1") return undefined;
    else if (key === "rootFolder") return undefined;
    else return value;
}

function deleteFolder(){
    const path = document.getElementById("delete_path").value
    if (path === "/"){
        alert("No puede borrar la carpeta root")
        return
    }
    const response = confirm("¿Está seguro de eliminar ese archivo/carpeta?");

    if (response) {
        if (logged_user.rootFolder.delete(path)){
            let new_action = new Action("Se eliminó carpeta: " + path, getDate(), "folderDeletion", "", path, path)
            bitacora.insertAction(new_action)
            localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
            display_actualFolder()
            updateHyperLinks()
            graphBitacora()
        }
        else alert("No se pudo eliminar el archivo, revise la ruta")

    }

}


function loadFiletoPath(){
    let fileContainer = document.getElementById("fileHolder")
    let file = fileContainer.files[0]

    const fr = new FileReader();
    fr.readAsDataURL(file)
    fr.onloadend = () => {
        let b64 = fr.result.split(',')[1]
        //console.log(fr.result)
       // console.log(b64)
       // fromb64tofile(b64, "prueba.pdf")

        const path = document.getElementById("new_file_path").value
        const name = fileContainer.value.replace('C:\\fakepath\\', '')

        let headerNew = new HeaderNode(name)
        headerNew.content = b64

        logged_user.rootFolder.getFolder(path).matrix.rows.insert(headerNew)
        console.log(logged_user)



    };

    graphBitacora()
}

function updateHyperLinks(){

    const buttonPressed = e => {
        let path = e.target.getAttribute("abs_path")
        if (path === "/"){
            current_folder = logged_user.rootFolder.root
            display_actualFolder()
            return
        }
            let foundFolder = logged_user.rootFolder.getFolder(path)
            if (!foundFolder) {
                alert("Carpeta no encontrada")
            }
            else{
                current_folder = foundFolder
                display_actualFolder()
            }


    }

    for (let button of hyperlinks) {
        button.addEventListener("click", buttonPressed);
    }
}


function studentDropList(node){
    // obtaining body of student table
    let list = document.getElementById("id_set")
    if (node != null) {
        studentDropList(node.left)
        let option = document.createElement("option");
        option.text = node.student.id
        list.appendChild(option)
        studentDropList(node.right);
    }
}


greetUser()
display_actualFolder()
updateHyperLinks()
graphBitacora()
studentDropList(AVLTree.root)



