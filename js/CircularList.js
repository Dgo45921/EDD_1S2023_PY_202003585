import CircularNode from "./CircularNode.js";

export default class CircularList{
    constructor() {
        this.first = null
        this.size = 0
    }

    insertAction(action){
        let new_node = new CircularNode(action)
        new_node.id = this.size
        if (this.first === null){
            this.first = new_node
            this.first.next = this.first
            this.size++
            return
        }

        let actual = new_node
        actual.next = this.first.next
        this.first.next = actual
        this.size++

    }

    getVizCode(){

        let actual = this.first
        let cadena_dot = " digraph G{\n "+
  "node[shape=record] \n"+
  "graph[pencolor=transparent, rank=same] \n"+
  "rankdir=LR; \n"+
  "splines = ortho \n"

        if (this.size === 1){
            cadena_dot += "p1[label=\" " + "Accion: " + this.first.action.action + "\\nFecha: " + this.first.action.date + "\" ] \n"
            cadena_dot += "p1->p1\n"
        }
        
        else{
            for (let i = 0; i <this.size ; i++) {
                cadena_dot += "node"+ actual.id + "[label=\" " + "Accion: " + actual.action.action + "\\nFecha: " + actual.action.date + "\" ]\n"
                actual = actual.next
            }
            for (let i = 0; i <this.size ; i++) {
                if (i!==this.size-1){
                    cadena_dot += "node" + i + "-> node" + (1+i) + " \n"
                }
            }

            cadena_dot+= "node" + (this.size-1)+ "->" + "node0" + "[constraint=false]\n"

            
        }



        cadena_dot += "}"
        return cadena_dot
    }



}