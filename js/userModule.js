import {reBuildTree, hashreturnStudentNode} from "./Reconstuctor.js";
import Action from "./Action.js";
import HeaderNode from "./HeaderNode.js";
import InternalNode from "./InternalNode.js";
import Graph from "./FolderGraph.js";
import HashTable from "./HashTable.js";

let StudentHashTable = new HashTable()
let AVLTree = reBuildTree()
createHashTableStudents(AVLTree.root)
let logged_user = hashreturnStudentNode(StudentHashTable.table, JSON.parse(localStorage.getItem("logged_user")).id);
let current_folder = logged_user.rootFolder.root
const hyperlinks = document.getElementsByTagName("a");
let bitacora = logged_user.bitacora

window.gotopath = gotopath
window.createFolder = createFolder
window.deleteFolder = deleteFolder
window.loadFiletoPath = loadFiletoPath
window.log_out = log_out
window.graphnary = graphnary
window.graphMatrix = graphMatrix
window.addPermission = addPermission
window.vistaNario = vistaNario
window.vistaGrafo = vistaGrafo

function createHashTableStudents(node){
    if (node) {
        createHashTableStudents(node.left)
        node.student.password = CryptoJS.SHA256(node.student.password).toString()
        StudentHashTable.insert(node.student)
        createHashTableStudents(node.right);
    }

}

function vistaNario(){
    let divNario = document.getElementById('vistaNario')
    let divGrafo = document.getElementById('vistaGrafo')
    divGrafo.style.display = 'none'
    divNario.style.display = 'block'

}

function vistaGrafo(){
    let divNario = document.getElementById('vistaNario')
    let divGrafo = document.getElementById('vistaGrafo')
    divGrafo.style.display = 'block'
    divNario.style.display = 'none'

}


function graphnary() {
    let viz_code = logged_user.rootFolder.graph_nary()
    let url = 'https://quickchart.io/graphviz?graph=';
    let tree_image = document.getElementById("NaryGraph")
    tree_image.setAttribute("src", url + viz_code)
    //console.log(viz_code)
}

function graphBitacora() {
    if (bitacora && bitacora.size > 0) {
        let viz_code = bitacora.getVizCode()
        let url = 'https://quickchart.io/graphviz?graph=';
        let bita = document.getElementById("imagenbita")
        bita.setAttribute("src", url + viz_code)
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
    xhr.onload = function () {
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


function display_actualFolder() {
    // code to display folders
    let actual_folder = document.getElementById("actual_folder")
    actual_folder.innerHTML = "path: " + current_folder.absolute_path
    let current_file = current_folder.first
    let list_files = document.getElementById("file_list")
    list_files.innerHTML = ""
    while (current_file) {


        let li = document.createElement('li');
        li.setAttribute('class', 'media my-3');
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


    // code to display files

    let actual_file = current_folder.matrix.rows.first
    while (actual_file) {

        let li = document.createElement('li');
        li.setAttribute('class', 'media my-3');
        list_files.appendChild(li);

        let img = document.createElement('img');
        img.setAttribute("height", "30")
        img.setAttribute("class", "mr-3")
        if (actual_file.id.endsWith(".txt")) {
            img.setAttribute("src", "img/text.png")
        } else if (actual_file.id.endsWith(".pdf")) {
            img.setAttribute("src", "img/pdf.png")
        } else if (actual_file.id.endsWith(".png") || actual_file.id.endsWith(".jpg") || actual_file.id.path.endsWith(".jpeg") || actual_file.id.path.endsWith(".gif") || actual_file.id.path.endsWith(".tiff")) {
            img.setAttribute("src", "img/image.png")
        } else {
            img.setAttribute("src", "img/folder.png")
        }

        li.appendChild(img)


        let div = document.createElement('media-body');
        li.appendChild(div)
        let a = document.createElement("a")
        a.setAttribute("href", "#")
        a.setAttribute("abs_path", actual_file.abs_path)
        a.innerHTML = actual_file.id
        div.appendChild(a)


        actual_file = actual_file.next
    }


    let li = document.createElement('li');
    li.setAttribute('class', 'media my-3');
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


function greetUser() {
    const jsonObject = JSON.parse(localStorage.getItem("logged_user"))
    let message = document.getElementById("message_user")
    message.innerHTML = "Bienvenido " + jsonObject.name
}

function gotopath() {


    const path = document.getElementById("gotopath").value
    //console.log(path)
    if (path === "/") {
        current_folder = logged_user.rootFolder.root
        display_actualFolder()
        return
    }

    let foundFolder = logged_user.rootFolder.getFolder(path)
    if (!foundFolder) {
        alert("Carpeta no encontrada")
    } else {
        current_folder = foundFolder
        display_actualFolder()
    }
    updateHyperLinks()
}

function getDate() {
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

    return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + minutes + ':' + seconds
}


function createFolder() {
    const path = document.getElementById("new_folder_path").value
    const name = document.getElementById("new_folder_name").value

    if (logged_user.rootFolder.insert_folder(name, path)) {
        display_actualFolder()
        updateHyperLinks()
        let new_action = new Action("Se creó carpeta: " + path + " en el directorio: " + name, getDate(), "folderCreation", "", path, name, "")
        bitacora.insertAction(new_action)
        graphBitacora()
        localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))

        updateGraph()

    }


    else alert("No se pudo agregar la carpeta, revise la ruta")
    // console.log(JSON.stringify(bitacora, replacer))
    // localStorage.setItem("bitacora", JSON.stringify(bitacora, replacer))
}

function updateGraph(){
    let grafito = new Graph()
    logged_user.rootFolder.generateGraph(logged_user.rootFolder.root, grafito)
    logged_user.graph = grafito
}


function replacer(key, value) {
    if (key === "first1") return undefined;
    else if (key === "next1") return undefined;
    else if (key === "rootFolder") return undefined;
    else if (key === "graph") return undefined;
    else return value;
}

function deleteFolder() {
    const response = confirm("¿Está seguro de eliminar ese archivo/carpeta?");
    let path = document.getElementById("delete_path").value


    if (path === "/") {
        alert("No puede borrar la carpeta root")
        return
    }

    if (response) {
        if (path.endsWith(".txt") || path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".png") || path.endsWith(".pdf") || path.endsWith(".gif") || path.endsWith(".tiff")) {
            if (response) {
            let pathArray = path.split("/")
            let filename = pathArray.pop()
            path = pathArray.join("/");
            //console.log("tengo que eliminar el archivo: ", filename, " perteneciente a la carpeta: ", path)
            if (path === ""){
                logged_user.rootFolder.getFolder("/").matrix.rows.delete(filename)
                display_actualFolder()
                updateHyperLinks()
                let new_action = new Action("Se eliminó archivo: " + filename, getDate(), "fileDeletion", "", "/", filename, "")
                bitacora.insertAction(new_action)
                localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
                updateGraph()
            }
            else {
                logged_user.rootFolder.getFolder(path).matrix.rows.delete(filename)
                display_actualFolder()
                updateHyperLinks()
                let new_action = new Action("Se eliminó archivo: " + filename, getDate(), "fileDeletion", "", path, filename, "")
                bitacora.insertAction(new_action)
                localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
                updateGraph()
            }
        }

    }
        else {

            if (logged_user.rootFolder.delete(path)) {
                let new_action = new Action("Se eliminó carpeta: " + path, getDate(), "folderDeletion", "", path, path, "")
                bitacora.insertAction(new_action)
                localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
                display_actualFolder()
                updateHyperLinks()
                graphBitacora()
                updateGraph()
            } else {
                alert("No se pudo eliminar el archivo, revise la ruta")
            }

        }


    }


}


function loadFiletoPath() {
    let fileContainer = document.getElementById("fileHolder")
    let file = fileContainer.files[0]

    const fr = new FileReader();
    fr.readAsDataURL(file)
    fr.onloadend = () => {
        let b64 = fr.result.split(',')[1]

        const path = document.getElementById("new_file_path").value
        const name = fileContainer.value.replace('C:\\fakepath\\', '')

        let headerNew = new HeaderNode(name)

        if (path === "/") {
            headerNew.abs_path = "/" + headerNew.id
        } else {
            headerNew.abs_path = path + "/" + headerNew.id
        }

        headerNew.content = b64


        logged_user.rootFolder.getFolder(path).matrix.rows.insert(headerNew)
        //console.log(logged_user)
        display_actualFolder()
        graphBitacora()

        let new_action = new Action("Se agregó archivo: " + name + " en el directorio: " + path, getDate(), "fileAdition", b64, name, path, "")
        console.log(new_action)
        bitacora.insertAction(new_action)
        graphBitacora()
        localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
        updateGraph()
    };


}

function updateHyperLinks() {

    const buttonPressed = e => {
        e.preventDefault()
        let path = e.target.getAttribute("abs_path")
        if (path === "/") {
            current_folder = logged_user.rootFolder.root
            display_actualFolder()
            return
        }

        if (path.endsWith(".txt") || path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".png") || path.endsWith(".pdf") || path.endsWith(".gif") || path.endsWith(".tiff")) {
            let pathArray = path.split("/")
            let filename = pathArray.pop()
            let folderToFind = pathArray.join("/");
            //console.log(nuevo_interno)
            if (folderToFind === "") {
                let foundFolder = logged_user.rootFolder.getFolder("/")
                let file = foundFolder.matrix.rows.getHeaderNode(filename)
                fromb64tofile(file.content, file.id.split(".")[1], file.id)
            } else {
                let foundFolder = logged_user.rootFolder.getFolder(folderToFind)
                let file = foundFolder.matrix.rows.getHeaderNode(filename)
                fromb64tofile(file.content, file.id.split(".")[1], file.id)
            }

        } else {
            let foundFolder = logged_user.rootFolder.getFolder(path)
            if (!foundFolder) {
                alert("Carpeta no encontrada")
            } else {
                current_folder = foundFolder
                display_actualFolder()
            }
        }


    }

    for (let button of hyperlinks) {
        button.addEventListener("click", buttonPressed);
    }
}


function studentDropList(node) {
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

function graphMatrix() {


    if (current_folder.matrix.rows.size > 0) {
        let viz_code = current_folder.matrix.getVizCode()
        let url = 'https://quickchart.io/graphviz?graph=';
        let matrix = document.getElementById("permissionMatrix")
        matrix.setAttribute("src", url + viz_code)
    } else {
        alert("No hay suficientes archivos para hacer el reporte")
    }


}

function addPermission() {
    if (document.getElementById("permissionToFile").value === "") {
        alert("Ruta inválida")
        return
    }
    let permission = document.getElementById("permission_set").value
    let carnet = document.getElementById("id_set").value
    let folderToFind = document.getElementById("permissionToFile").value
    let pathArray = folderToFind.split("/")
    let filename = pathArray.pop()
    folderToFind = pathArray.join("/");
    let nuevo_interno = new InternalNode(filename, carnet, permission)
    //console.log(nuevo_interno)

    console.log("Tengo que buscar la carpeta: ", folderToFind)
    console.log("Y otorgarle permiso: ", permission, " al carnet: ", carnet)
    console.log(filename)

    if (folderToFind === "") {
        if (logged_user.rootFolder.getFolder("/").matrix.rows.findFile(filename)) {
            logged_user.rootFolder.getFolder("/").matrix.insert(nuevo_interno)
            let new_action = new Action("Se otorgó permiso del archivo: " + "/" + filename + " a : " + carnet, getDate(), "permission", permission, filename, carnet, "/")
            console.log(new_action)
            bitacora.insertAction(new_action)
            graphBitacora()
            localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
            updateGraph()
        } else {
            alert("archivo inexistente, revise la ruta")
        }


    } else {
        if (logged_user.rootFolder.getFolder(folderToFind).matrix.rows.findFile(filename)) {
            logged_user.rootFolder.getFolder(folderToFind).matrix.insert(nuevo_interno)
            let new_action = new Action("Se otorgó permiso del archivo: " + folderToFind + "/" + filename + " a : " + carnet, getDate(), "permission", permission, filename, carnet, folderToFind)
            console.log(new_action)
            bitacora.insertAction(new_action)
            graphBitacora()
            localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
            updateGraph()
        } else {
            alert("archivo inexistente, revise la ruta")
        }
    }

}


greetUser()
display_actualFolder()
updateHyperLinks()
graphBitacora()
studentDropList(AVLTree.root)
console.log(logged_user.graph.getVizCode())
console.log(logged_user)



