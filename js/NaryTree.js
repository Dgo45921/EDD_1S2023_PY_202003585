import N_aryNode from "./N_aryNode.js";
import {count_repeatedfiles} from "./LLFolderHandler.js";
export default class NaryTree{
    constructor() {
        this.nodo_creados = 1;
        this.root = new N_aryNode("/", 1, "folder")
    }


    addFile(new_folder, path, type, content){
        const new_node = new N_aryNode(new_folder, this.nodo_creados)
        new_node.type = type
        new_node.content = content
        //Check if insertion is at empty root folder
        if(path[1] === "" && this.root.first === null){
            this.root.first = new_node
            this.nodo_creados++
        }
        //Check if insertion is in root folder but this has multiple files
        else if(path[1] === "" && this.root.first !== null){
            let counter = count_repeatedfiles(this.root.first, new_folder)
            let current_node = this.root.first
            while (current_node.next){
                current_node = current_node.next
            }
            if (counter !== 0)  {new_node.path = new_node.path + "("+ (counter) +")"}
            current_node.next = new_node
            this.nodo_creados++

        }

        //If the path requires to enter to another folder but the root is empty
        if (this.root.first === null){
            alert("Ruta inválida, carpeta raíz vacía.")
            return
        }


        else if(path[1] !== ""){
            let current_node = this.root.first
            let position = 1;
            // Traverse path array to go deep into the folders
            for(let i = 1; i < path.length; i++){
                if(current_node !== null){
                    while(current_node){
                        // Check position not going out of the bounds of path array and if the folder is found
                        if(position < path.length && path[position] === current_node.path && current_node.type === "folder"){
                            position++
                            //Get the root folder we need
                            if(current_node.first !== null && position < path.length){
                                current_node = current_node.first
                            }
                            break;
                        }else{
                            current_node = current_node.next
                        }
                    }
                }else{
                    break;
                }
            }
            //check if the node that we got previously is null
            if (current_node === null){
                alert("Ruta inválida, revisa la ruta ingresada")
            }
            else{
                // check if the new file is going to be first inside a folder
                if(current_node.first === null){
                    current_node.first = new_node
                    this.nodo_creados++
                }
                // traverse all files to insert at the end
                else{

                    let counter = count_repeatedfiles(current_node.first, new_folder)
                    let actual = current_node.first
                    while (actual.next){
                        actual = actual.next
                    }
                    if (counter !== 0) {new_node.path = new_node.path + "("+ (counter) +")"}
                    actual.next = new_node
                    this.nodo_creados++
                }
            }
        }

    }


    insert_folder(path, new_folderName){
        let subPaths = path.split('/')
        this.addFile(new_folderName, subPaths, "folder", "")
    }

    insertFile(path, new_fileName, b64){
        let subPaths = path.split('/')
        this.addFile(new_fileName, subPaths, "file", b64)
    }

    graph_nary(){
        let cadena = "";
        if(!(this.root === null)){
            cadena = "digraph Nario{ \n";
            cadena = cadena + this.nary_nodeviz(this.root) + "\n";
            cadena = cadena + "}";
        }else{
            cadena = "digraph G { Nario }\n";
        }
        return cadena;
    }

    nary_nodeviz(raiz){
        let cadena = "node[shape=record]\n splines=ortho \n";
        let node_num = 1;
        let parent_node = 0;
        cadena += "node" + parent_node + "[label=\"" + this.root.path  + "\"] \n "
        cadena += this.nodeNaryC(this.root.first, node_num, parent_node)
        cadena += this.edgesnary(this.root.first, 0)
        return cadena;
    }


    nodeNaryC(root, nodo, parent_node){
        let cadena = ""
        let actual = root
        let parent_nodeadd = parent_node
        if(actual !== null){
            while(actual){
                cadena += "node" + actual.id + "[label=\"" + actual.type + "\\n" +  actual.path  + "\"] \n"
                actual = actual.next
            }
            actual = root
            while(actual){
                parent_nodeadd++
                cadena += this.nodeNaryC(actual.first, this.nodo_creados, parent_nodeadd)
                actual = actual.next
            }
        }
        return cadena
    }

    edgesnary(root, parent_node){
        let cadena = ""
        let actual = root
        if(actual !== null){
            while(actual){
                cadena += "node" + parent_node + " -> node" + actual.id + " "
                actual = actual.next
            }
            actual = root
            while(actual){
                cadena += this.edgesnary(actual.first, actual.id)
                actual = actual.next
            }
        }
        return cadena
    }








}