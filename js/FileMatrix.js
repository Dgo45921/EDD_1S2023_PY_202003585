import HeaderList from "./HeaderList.js";
import HeaderNode from "./HeaderNode.js";

export default class FileMatrix{
    constructor(name) {
        this.name = name
        this.rows = new HeaderList("row")
        this.columns = new HeaderList("column")
    }


    insert(internalNode){
        let headerX = this.rows.getHeaderNode(internalNode.x)
        let headerY = this.columns.getHeaderNode(internalNode.y)

        if (!headerX){
            headerX = new HeaderNode(internalNode.x)
            this.rows.insert(headerX)
        }

        if (!headerY){
            headerY = new HeaderNode(internalNode.y)
            this.columns.insert(headerY)
        }

        if (!headerX.access){
            headerX.access = internalNode
        }
        else{
            // inserting internal node in row
            if (internalNode.y<headerX.access.y){
                internalNode.right = headerX.access
                headerX.access.left = internalNode
                headerX.access = internalNode
            }

            else{
                let actual = headerX.access
                while (actual){
                    if (internalNode.y<actual.y){
                        internalNode.right = actual
                        internalNode.left = actual.left
                        actual.left.right = internalNode
                        actual.left = internalNode
                        break
                    }
                    else{
                        if (!actual.right){
                            actual.right = internalNode
                            internalNode.left = actual
                            break
                        }
                         else{
                            actual = actual.right
                        }


                    }

                }
            }

        }



        // Y coordinate
        if (!headerY.access){
            headerY.access = internalNode
        }
        else{
            // inserting internal node in row
            if (internalNode.x<headerY.access.x){
                internalNode.down = headerY.access
                headerY.access.up = internalNode
                headerY.access = internalNode
            }

            else{
                let actual = headerY.access
                while (actual){
                    if (internalNode.x<actual.x){
                        internalNode.down = actual
                        internalNode.up = actual.up
                        actual.up.down = internalNode
                        actual.up = internalNode
                        break
                    }
                    else{
                        if (!actual.down){
                            actual.down = internalNode
                            internalNode.up = actual
                            break
                        }
                        else{
                            actual = actual.down
                        }


                    }

                }
            }

        }



    }


    getVizCode(){
        let grafo = 'digraph T{ \nnode[shape=box fontname="Arial" fillcolor="white" style=filled ]'
        grafo += '\nroot[label = \"capa: '+ this.name +'\", group=1]\n'
        grafo += `label = "MATRIZ DISPERSA" 
                    fontname="Arial Black" 
                    fontsize="15pt" `

        // creando nodos de las filas

        let x_row = this.rows.first
        while (x_row){
            grafo += 'Node{}[label="{}",fillcolor="plum",group=1];\n'.format("row"+x_row.id, x_row.id)
            x_row = x_row.next
        }

        // creando los nodos de las columnas

        let y_col = this.columns.first
        while (y_col){
            grafo += 'Node{}[label="{}",fillcolor="plum",group=1];\n'.format("col"+y_col.id, y_col.id)
            y_col = y_col.next
        }

        // conectando las columnas

        y_col = this.columns.first
        while (y_col.next){
            grafo += 'Node{} -> Node{} [dir=both];\n'.format("col"+y_col.id, "col"+y_col.next.id)
            y_col = y_col.next
        }


        // conectando las filas

        x_row = this.rows.first
        while (x_row.next){
            grafo += 'Node{} -> Node{} [dir=both];\n'.format("row"+x_row.id, "row"+ x_row.next.id)
            x_row = x_row.next
        }





    }

}