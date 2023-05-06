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
let current_folderGraph = logged_user.graph.rootNode
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
window.graphGraph = graphGraph
window.findFolderGraph = findFolderGraph
window.displayPermissions = displayPermissions
window.showChat = showChat

function findFolderGraph() {
    let path = document.getElementById("gotopathGraph").value
    console.log(logged_user.graph.findNodeByPath(path))

}


function createHashTableStudents(node) {
    if (node) {
        createHashTableStudents(node.left)
        StudentHashTable.insert(node.student)
        createHashTableStudents(node.right);
    }

}

function vistaNario() {
    let divNario = document.getElementById('vistaNario')
    let divGrafo = document.getElementById('vistaGrafo')
    divGrafo.style.display = 'none'
    divNario.style.display = 'block'

}

function vistaGrafo() {
    let divNario = document.getElementById('vistaNario')
    let divGrafo = document.getElementById('vistaGrafo')
    divGrafo.style.display = 'block'
    divNario.style.display = 'none'
    display_actualFolderGraphFolders('/')
    display_actualFolderGraphFiles('/', '')

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

function graphGraph() {
    document.getElementById('chat').style.display = 'none'
    document.getElementById('containerShared').style.display = 'none'
    document.getElementById('containerGraph').style.display = 'block'
    let viz_code = logged_user.graph.getVizCode()
    let url = 'https://quickchart.io/graphviz?graph=';
    let tree_image = document.getElementById("graphImage")
    tree_image.setAttribute("src", url + viz_code)
    //console.log(viz_code)
}

function showChat() {
    document.getElementById('chat').style.display = 'block'
    document.getElementById('containerShared').style.display = 'none'
    document.getElementById('containerGraph').style.display = 'none'

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
        } else if (actual_file.id.endsWith(".png") || actual_file.id.endsWith(".jpg") || actual_file.id.endsWith(".jpeg") || actual_file.id.endsWith(".gif") || actual_file.id.endsWith(".tiff")) {
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


function display_actualFolderGraph(original, path, child) {
    display_actualFolderGraphFolders(original)
    display_actualFolderGraphFiles(path, child)
}

function display_actualFolderGraphFolders(path) {
    // code to display folders

    let list_files = document.getElementById("file_listGraph")
    list_files.innerHTML = ""
    let actual_folder = document.getElementById("actual_folderGraph")

    actual_folder.innerHTML = "path: " + path

    let lel = logged_user.graph.findNodeByPath(path)
    if (lel) {
        let current_folder = lel.siguiente

        while (current_folder) {


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
            if (path === '/') {
                a.setAttribute("abs_pathGraph", '/' + current_folder.path)
            } else {
                a.setAttribute("abs_pathGraph", path + '/' + current_folder.path)
            }

            a.innerHTML = current_folder.path
            div.appendChild(a)


            current_folder = current_folder.siguiente
        }


        updateHyperLinks()
    }
}


function display_actualFolderGraphFiles(path, child) {

    let list_files = document.getElementById("file_listGraph")


    // code to display files
    let lel = logged_user.graph.findNodeByPath2(path, child)

    if (lel) {
        let actual_file = lel.matrix.rows.first
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
            } else if (actual_file.id.endsWith(".png") || actual_file.id.endsWith(".jpg") || actual_file.id.endsWith(".jpeg") || actual_file.id.endsWith(".gif") || actual_file.id.endsWith(".tiff")) {
                img.setAttribute("src", "img/image.png")
            } else {
                img.setAttribute("src", "img/folder.png")
            }

            li.appendChild(img)


            let div = document.createElement('media-body');
            li.appendChild(div)
            let a = document.createElement("a")
            a.setAttribute("href", "#")
            a.setAttribute("abs_pathGraph", actual_file.abs_path)
            a.innerHTML = actual_file.id
            div.appendChild(a)


            actual_file = actual_file.next
        }
    }


    let li = document.createElement('li');
    li.setAttribute('class', 'media my-3');
    list_files.appendChild(li);
    let div = document.createElement('media-body');
    li.appendChild(div)
    let a = document.createElement("a")
    a.setAttribute("href", "#")
    a.setAttribute("abs_pathGraph", "/")
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
        let new_action = new Action("Se creó carpeta: " + path + " en el directorio: " + name, getDate(), "folderCreation", "", path, name, "")
        bitacora.insertAction(new_action)
        graphBitacora()
        localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))

        updateGraph()

    } else alert("No se pudo agregar la carpeta, revise la ruta")
    // console.log(JSON.stringify(bitacora, replacer))
    // localStorage.setItem("bitacora", JSON.stringify(bitacora, replacer))
}

function updateGraph() {
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

function clearPermissionTable(){
    const old_tbody = document.getElementById("permissionTableBody")
    const new_tbody = document.createElement('tbody');
    new_tbody.setAttribute("id", "permissionTableBody")
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
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
                if (path === "") {
                    logged_user.rootFolder.getFolder("/").matrix.rows.delete(filename)
                    display_actualFolder()

                    let new_action = new Action("Se eliminó archivo: " + filename, getDate(), "fileDeletion", "", "/", filename, "")
                    bitacora.insertAction(new_action)
                    localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
                    updateGraph()
                } else {
                    logged_user.rootFolder.getFolder(path).matrix.rows.delete(filename)
                    display_actualFolder()

                    let new_action = new Action("Se eliminó archivo: " + filename, getDate(), "fileDeletion", "", path, filename, "")
                    bitacora.insertAction(new_action)
                    localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
                    updateGraph()
                }
            }

        } else {

            if (logged_user.rootFolder.delete(path)) {
                let new_action = new Action("Se eliminó carpeta: " + path, getDate(), "folderDeletion", "", path, path, "")
                bitacora.insertAction(new_action)
                localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
                display_actualFolder()
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
        // console.log(new_action)
        bitacora.insertAction(new_action)
        graphBitacora()
        localStorage.setItem("jsonArbol", JSON.stringify(AVLTree, replacer))
        updateGraph()
    };


}

function updateHyperLinks() {

    const buttonPressed = e => {

        e.preventDefault()
        for (let button of hyperlinks) {
            button.removeEventListener("click", buttonPressed);

        }
        if (e.target.getAttribute("abs_path") && !e.target.getAttribute("abs_pathGraph")) {
            let path = e.target.getAttribute("abs_path")
            //
            // console.log(path)
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
                    display_actualFolder()
                } else {
                    let foundFolder = logged_user.rootFolder.getFolder(folderToFind)
                    let file = foundFolder.matrix.rows.getHeaderNode(filename)
                    fromb64tofile(file.content, file.id.split(".")[1], file.id)
                    display_actualFolder()
                }

            } else {
                let foundFolder = logged_user.rootFolder.getFolder(path)
                if (!foundFolder) {
                    alert("Carpeta no encontrada")
                    display_actualFolder()
                } else {
                    current_folder = foundFolder
                    display_actualFolder()
                }
            }


        } else {
            if (e.target.getAttribute('owner')){
                console.log('tengo que buscar en las carpetas del owner zz')
                let owner = StudentHashTable.getUser(e.target.getAttribute('owner'))
                let path = e.target.getAttribute("abs_pathGraph")
                let pathArray = path.split("/")
                let filename = pathArray.pop()
                let folderToFind = pathArray.join("/");
                // console.log('eeii')
                // console.log(filename)
                //console.log(folderToFind)


                const componentes = folderToFind.split('/');
                let ultimaCarpeta = componentes.pop();
                let rutaSinUltimo = componentes.join('/');


                if (rutaSinUltimo === '') {
                    rutaSinUltimo = '/'
                }
                if (!ultimaCarpeta) {
                    ultimaCarpeta = ''
                }
                // console.log(ultimaCarpeta)
                //console.log(rutaSinUltimo)

                let prueba = owner.graph.findNodeByPath2(rutaSinUltimo, ultimaCarpeta)
                //console.log(prueba)




                searchFile(prueba, filename)


            }
            else{
                let path = e.target.getAttribute("abs_pathGraph")
                if (path === '/') {
                    display_actualFolderGraph(path, '/', '')

                } else {
                    console.log(path)
                    if (path.endsWith(".txt") || path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".png") || path.endsWith(".pdf") || path.endsWith(".gif") || path.endsWith(".tiff")) {
                        let pathArray = path.split("/")
                        let filename = pathArray.pop()
                        let folderToFind = pathArray.join("/");
                        // console.log('eeii')
                        // console.log(filename)
                        //console.log(folderToFind)


                        const componentes = folderToFind.split('/');
                        let ultimaCarpeta = componentes.pop();
                        let rutaSinUltimo = componentes.join('/');


                        if (rutaSinUltimo === '') {
                            rutaSinUltimo = '/'
                        }
                        if (!ultimaCarpeta) {
                            ultimaCarpeta = ''
                        }
                        // console.log(ultimaCarpeta)
                        //console.log(rutaSinUltimo)

                        let prueba = logged_user.graph.findNodeByPath2(rutaSinUltimo, ultimaCarpeta)
                        //console.log(prueba)




                        searchFile(prueba, filename)
                    } else {

                        const componentes = path.split('/');
                        let ultimaCarpeta = componentes.pop();
                        let rutaSinUltimo = componentes.join('/');


                        if (rutaSinUltimo === '') {
                            rutaSinUltimo = '/'
                        }
                        if (!ultimaCarpeta) {
                            ultimaCarpeta = ''
                        }
                        // console.log(path)

                        display_actualFolderGraph(path, rutaSinUltimo, ultimaCarpeta)


                    }


                }

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

function searchFile(folderNode, filename) {

    let actual = folderNode.matrix.rows.first
    while (actual) {
        if (actual.id === filename) {


            displayContent(actual.content, actual.id.split('.')[1])
            break
        }

        actual = actual.next
    }


}

function displayContent(base64String, type) {

    let visualizer = document.getElementById('visualizer')
    if (type === 'txt') {
        visualizer.setAttribute('src', 'data:text/plain' + ';base64,' + base64String)

    } else if (type === 'pdf') {
        visualizer.setAttribute('src', 'data:application/' + type + ';base64,' + base64String)
    } else {
        visualizer.setAttribute('src', 'data:image/' + type + ';base64,' + base64String)
    }

    updateHyperLinks()

}

function displayPermissions() {
    clearPermissionTable()
    let tbody = document.getElementById("permissionTableBody")
    document.getElementById('chat').style.display = 'none'
    document.getElementById('containerShared').style.display = 'block'
    document.getElementById('containerGraph').style.display = 'none'

    for (let i = 0; i < StudentHashTable.table.length; i++) {
        if (i === 17) {
            console.log(5)
        }


        if (StudentHashTable.table[i]) {
            let currentGraph = StudentHashTable.table[i].graph
            let actualRow = currentGraph.rootNode
            while (actualRow) {
                // get matrixes of root node in graph
                if (actualRow.path === '/') {


                    let actualMatrixRow = actualRow.matrix.rows.first
                    while (actualMatrixRow) {

                        let accessRow = actualMatrixRow.access
                        while (accessRow) {

                            if (accessRow.y === logged_user.id.toString()) {
                                let a = document.createElement("a")
                                a.setAttribute("href", "#")
                                a.setAttribute("abs_pathGraph",  actualMatrixRow.abs_path)
                                a.setAttribute("owner",  StudentHashTable.table[i].id)
                                a.innerHTML = actualMatrixRow.id

                                console.log(`el archivo ${actualMatrixRow.id} tiene permiso ${accessRow.permission} con ${accessRow.y}`)
                                console.log('tener en cuenta este archivo')
                                const new_row = tbody.insertRow();
                                const owner = new_row.insertCell(0);
                                const name = new_row.insertCell(1);
                                const permission = new_row.insertCell(2);
                                owner.innerHTML = StudentHashTable.table[i].id
                                name.appendChild(a)
                                permission.innerHTML = accessRow.permission


                            }




                            accessRow = accessRow.right
                        }


                        actualMatrixRow = actualMatrixRow.next
                    }
                }


                // gets the matrixes inside
                let actualColumn = actualRow.siguiente
                while (actualColumn) {


                    let actualMatrixRow = actualColumn.matrix.rows.first
                    while (actualMatrixRow) {

                        let accessRow = actualMatrixRow.access
                        while (accessRow) {

                            if (accessRow.y === logged_user.id.toString()) {
                                let a = document.createElement("a")
                                a.setAttribute("href", "#")
                                a.setAttribute("abs_pathGraph",  actualMatrixRow.abs_path)
                                a.setAttribute("owner",  StudentHashTable.table[i].id)
                                a.innerHTML = actualMatrixRow.id

                                console.log(`el archivo ${actualMatrixRow.id} tiene permiso ${accessRow.permission} con ${accessRow.y}`)
                                console.log('tener en cuenta este archivo')
                                const new_row = tbody.insertRow();
                                const owner = new_row.insertCell(0);
                                const name = new_row.insertCell(1);
                                const permission = new_row.insertCell(2);
                                owner.innerHTML = StudentHashTable.table[i].id
                                name.appendChild(a)
                                permission.innerHTML = accessRow.permission
                            }




                            accessRow = accessRow.right
                        }


                        actualMatrixRow = actualMatrixRow.next
                    }


                    actualColumn = actualColumn.siguiente
                }


                actualRow = actualRow.abajo
            }
        }

    }
    updateHyperLinks()


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

updateGraph()
greetUser()
display_actualFolder()
graphBitacora()
studentDropList(AVLTree.root)
