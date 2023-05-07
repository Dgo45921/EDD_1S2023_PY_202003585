import FileMatrix from "./FileMatrix.js";

class NodeAdjacencyMatrix{
    constructor(path){
        this.siguiente = null
        this.abajo = null
        this.path = path
        this.matrix = null
    }
}

export default class Graph {
    constructor(){
        this.rootNode = null
    }

    findNodeByPath(path) {
        if (path === '/') return this.rootNode

        let currentNode = this.rootNode
        while (currentNode){
            if(currentNode.path === path) return currentNode


            currentNode = currentNode.abajo
        }



    }



    findNodeByPath2(padre, child) {
        if (padre === '/' && child === '') return this.rootNode

        let currentNode = this.rootNode
        while (currentNode){
            if(currentNode.path === padre) {
                let currentFolder = currentNode.siguiente
                while(currentFolder){
                    if(currentFolder.path === child){
                        return currentFolder
                    }
                    currentFolder = currentFolder.siguiente
                }

            }


            currentNode = currentNode.abajo
        }
        return  null
    }

    searchRow(padre){
        let actual = this.rootNode
        while(actual){
            if(actual.path === padre) return true
            actual = actual.abajo
        }
        return false
    }

    insertRow(texto, matrix){
        const nuevoNodo = new NodeAdjacencyMatrix(texto)

        if(this.rootNode === null){
            this.rootNode = nuevoNodo
            if(matrix){
                this.rootNode.matrix = matrix
            }
        }else{
            let aux = this.rootNode
            while(aux.abajo){
                if(aux.path === nuevoNodo.path){
                    return
                }
                aux = aux.abajo
            }
            aux.abajo = nuevoNodo
        }
    }

    insertColumn(padre, hijo, matrix){
        const nuevoNodo = new NodeAdjacencyMatrix(hijo)
        if(matrix){
         nuevoNodo.matrix = matrix
        }

        if(this.rootNode !== null && this.rootNode.path === padre){
            let aux = this.rootNode
            while(aux.siguiente){
                aux = aux.siguiente
            }
            aux.siguiente = nuevoNodo
        }else{

            if (!this.searchRow(padre)){
                this.insertRow(padre, matrix)
            }
            if (padre !== '/'){
                let aux = this.rootNode
                while(aux){
                    if(aux.path === padre){
                        break;
                    }
                    aux = aux.abajo
                }
                if(aux !== null){
                    while(aux.siguiente){
                        aux = aux.siguiente
                    }
                    aux.siguiente = nuevoNodo
                }

            }

        }
    }

    insertarValores(padre, hijos, matrix){
        let cadena = hijos.split(',')
        for(let i = 0; i < cadena.length; i++){
            this.insertColumn(padre,cadena[i], matrix)
        }
    }

    //Reporte modificado para trabajar con carpetas
    getVizCode(){
        let vizCode = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let parentNode = this.rootNode
        let childNode = this.rootNode
        let weight = 0
        while(parentNode){
            childNode = parentNode.siguiente
            let profundidad = parentNode.path.split('/')
            let padre = ""
            if(profundidad.length === 2 && profundidad[1] === ""){ weight = 1}
            else if(profundidad.length === 2 && profundidad[1] !== ""){ weight = 2 }
            else { weight = profundidad.length }
            if(parentNode.path !== "/"){ padre = profundidad[profundidad.length-1] }
            else { padre = "/" }
            while(childNode){
                vizCode += "\"" + padre + "\"" + " -- " + "\"" + childNode.path+ "\"" + " [label=\"" + weight + "\", minlen=" + 3 + "] "
                childNode = childNode.siguiente
            }
            parentNode = parentNode.abajo
        }
        vizCode += "}"
        return vizCode
    }
}

