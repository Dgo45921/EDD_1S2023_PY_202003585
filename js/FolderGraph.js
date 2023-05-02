class NodeAdjacencyMatrix{
    constructor(valor){
        this.siguiente = null
        this.abajo = null
        this.valor = valor
    }
}

export default class Graph {
    constructor(){
        this.rootNode = null
    }

    searchRow(padre){
        let actual = this.rootNode
        while(actual){
            if(actual.valor === padre) return true
            actual = actual.abajo
        }
        return false
    }

    insertRow(texto){
        const nuevoNodo = new NodeAdjacencyMatrix(texto)
        if(this.rootNode === null){
            this.rootNode = nuevoNodo
        }else{
            let aux = this.rootNode
            while(aux.abajo){
                if(aux.valor === nuevoNodo.valor){
                    return
                }
                aux = aux.abajo
            }
            aux.abajo = nuevoNodo
        }
    }

    insertarC(padre, hijo){
        const nuevoNodo = new NodeAdjacencyMatrix(hijo)
        if(this.rootNode !== null && this.rootNode.valor === padre){
            let aux = this.rootNode
            while(aux.siguiente){
                aux = aux.siguiente
            }
            aux.siguiente = nuevoNodo
        }else{

            if (!this.searchRow(padre)){
                this.insertRow(padre)
            }
            let aux = this.rootNode
            while(aux){
                if(aux.valor === padre){
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

    insertarValores(padre, hijos){
        let cadena = hijos.split(',')
        for(let i = 0; i < cadena.length; i++){
            this.insertarC(padre,cadena[i])
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
            let profundidad = parentNode.valor.split('/')
            let padre = ""
            if(profundidad.length === 2 && profundidad[1] === ""){ weight = 1}
            else if(profundidad.length === 2 && profundidad[1] !== ""){ weight = 2 }
            else { weight = profundidad.length }
            if(parentNode.valor !== "/"){ padre = profundidad[profundidad.length-1] }
            else { padre = "/" }
            while(childNode){
                vizCode += "\"" + padre + "\"" + " -- " + "\"" + childNode.valor + "\"" + " [label=\"" + weight + "\"] "
                childNode = childNode.siguiente
            }
            parentNode = parentNode.abajo
        }
        vizCode += "}"
        return vizCode
    }
}

