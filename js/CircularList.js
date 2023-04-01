import CircularNode from "./CircularNode.js";

export default class CircularList{
    constructor() {
        this.first1 = null
        this.first2 = null
        this.size = 0
    }

    insertAction(action){
        this.size++
        let new_node = new CircularNode(action)
        let new_node2 = new CircularNode(action)
        new_node.id = this.size
        new_node2.id = this.size
        if (this.first1 === null){
            // circular list
            this.first1 = new_node
            this.first1.next1 = this.first1
            // non circular list
            this.first2 = new_node2

            return
        }

        //circular list
        let actual = this.first1
        while (actual.next1 !==this.first1){
            actual = actual.next1
        }
        actual.next1 = new_node
        new_node.next1 = this.first1


        // non circular list
        let actual2 = this.first2
        while (actual2.next2){
            actual2 = actual2.next2
        }
        actual2.next2 = new_node2

    }

    getVizCode() {
        let actual = this.first1;
        let cadena_dot = "digraph G {\n" +
            "  node [shape=record]\n" +
            "  graph [pencolor=transparent, rank=same]\n" +
            "  rankdir=LR;\n" +
            "  splines=ortho\n";

        if (this.size === 1) {
            cadena_dot += "  p1 [label=\"Accion: " + this.first1.action.action + "\\nFecha: " + this.first1.action.date + "\"]\n" +
                "  p1 -> p1\n";
        } else {
            for (let i = 0; i < this.size; i++) {
                cadena_dot += "  node" + actual.id + " [label=\"Accion: " + actual.action.action + "\\nFecha: " + actual.action.date + "\"]\n";
                actual = actual.next1;
            }
            for (let i = 1; i <= this.size; i++) {
                if (i !== this.size) {
                    cadena_dot += "  node" + i + " -> node" + (i + 1) + "\n";
                } else {
                    cadena_dot += "  node" + i + " -> node1 [constraint=false]\n";
                }
            }
        }

        cadena_dot += "}\n";
        return cadena_dot;
    }




}