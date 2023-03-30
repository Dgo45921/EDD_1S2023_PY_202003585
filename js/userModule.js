import AVL from "./AVL.js";
import Student from "./Student.js";
import NaryTree from "./NaryTree.js";
import {reBuildTree} from "./Reconstuctor.js";
import {returnStudentNode} from "./Reconstuctor.js";

let AVLTree = reBuildTree()
let logged_user = returnStudentNode(AVLTree.root, JSON.parse(localStorage.getItem("logged_user")).id);
let current_folder = logged_user.rootFolder.root


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



function log_out() {
    window.location.href = window.location.origin + "/EDD_1S2023_PY_202003585/index.html"
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


function display_actualFolder(){
    let actual_folder = document.getElementById("actual_folder")
    actual_folder.innerHTML = "path: " + current_folder.path
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
        if (current_file.path.endsWith(".txt")){
            img.setAttribute("src", "img/text.png")
        }
        else if (current_file.path.endsWith(".pdf")){
            img.setAttribute("src", "img/pdf.png")
        }

        else if (current_file.path.endsWith(".png") || current_file.path.endsWith(".jpg") || current_file.path.endsWith(".jpeg") || current_file.path.endsWith(".gif") || current_file.path.endsWith(".tiff")){
            img.setAttribute("src", "img/image.png")
        }

        else{
            img.setAttribute("src", "img/folder.png")
        }

        li.appendChild(img)

        let div = document.createElement('media-body');
        li.appendChild(div)
        let a = document.createElement("a")
        a.setAttribute("href", "#")
        a.innerHTML = current_file.path
        div.appendChild(a)





        switch (current_file.type){
            case "folder":
                console.log("folder")
                break
            case "file":
                console.log("file")
                break

        }

        current_file = current_file.next
    }
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

    logged_user.rootFolder.insert_folder(name, path)
    console.log(logged_user.rootFolder.root)
    display_actualFolder()
    localStorage.setItem("jsonArbol", JSON.stringify(AVLTree))
}

function deleteFolder(){
    const path = document.getElementById("delete_path").value
    console.log(path)
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

        logged_user.rootFolder.insertFile(path, name, b64)
        console.log(logged_user.rootFolder.root)
        display_actualFolder()
        localStorage.setItem("jsonArbol", JSON.stringify(AVLTree))
        console.log(localStorage.getItem("jsonArbol"))
    };

}





greetUser()
display_actualFolder()




