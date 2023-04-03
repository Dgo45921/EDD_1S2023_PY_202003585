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
            internalNode.xCoordinate = headerX.id2
        }

        if (!headerY){
            headerY = new HeaderNode(internalNode.y)
            this.columns.insert(headerY)
            internalNode.yCoordinate = headerY.id2
        }

        if (headerY){
            internalNode.yCoordinate = headerY.id2
        }
        if (headerX){
            internalNode.xCoordinate = headerX.id2
        }

        if (!headerX.access){
            headerX.access = internalNode
            internalNode.left = headerX
        }
        else{
            // inserting internal node in row
            if (internalNode.yCoordinate<headerX.access.yCoordinate){
                internalNode.left = headerX
                internalNode.right = headerX.access
                headerX.access.left = internalNode
                headerX.access = internalNode
            }

            else{
                let actual = headerX.access
                while (actual){
                    if (internalNode.yCoordinate<actual.yCoordinate){
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
            internalNode.up = headerY
        }
        else{
            // inserting internal node in row
            if (internalNode.xCoordinate<headerY.access.xCoordinate){
                internalNode.up = headerY
                internalNode.down = headerY.access
                headerY.access.up = internalNode
                headerY.access = internalNode
            }

            else{
                let actual = headerY.access
                while (actual){
                    if (internalNode.xCoordinate<actual.xCoordinate){
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
        grafo += '\nroot[label = \"carpeta: '+ this.name +'\", group=1]\n'
        grafo += `label = "MATRIZ DISPERSA" 
                    fontname="Arial Black" 
                    fontsize="15pt" \n `

        // creando nodos de la fila cabecera

        let x_row = this.rows.first
        while (x_row){
            grafo += `Node${"row"+x_row.id.replace(".", "").replace("(", "").replace(")", "")}[label="${x_row.id}",fillcolor="plum"];\n`
            x_row = x_row.next
        }

        // conectando nodos de la fila cabecera

        grafo += `root -> Node${"row"+ this.rows.first.id.replace(".", "").replace("(", "").replace(")", "")} [dir=both];\n` // connecting root node to first row

        x_row = this.rows.first
        while (x_row.next){
            grafo += `Node${"row"+x_row.id.replace(".", "").replace("(", "").replace(")", "")} -> Node${"row"+ x_row.next.id.replace(".", "").replace("(", "").replace(")", "")} [dir=both];\n`
            x_row = x_row.next
        }



        grafo += "{ rank=same; root; "
        // definiendo el nivel de la primera fila cabecera
        x_row = this.columns.first
        while (x_row){
            grafo += `Node${"col"+x_row.id};`
            x_row = x_row.next
        }
        grafo +="}\n"




        if (this.columns.first){
            // creando los nodos de las columnas

            let y_col = this.columns.first
            while (y_col){
                grafo += `Node${"col"+y_col.id}[label="${y_col.id}",fillcolor="plum"];\n`
                y_col = y_col.next
            }

            grafo += `root -> Node${"col"+ this.columns.first.id} [dir=both];\n` // connecting root node to first column

            // conectando las columnas

            y_col = this.columns.first
            while (y_col.next){
                grafo += `Node${"col"+y_col.id} -> Node${"col"+y_col.next.id} [dir=both];\n`
                y_col = y_col.next
            }



            // creando nodos internos
            x_row = this.rows.first
            while (x_row){
                let x_row2 = x_row.access
                while (x_row2){
                    grafo += `Node${x_row2.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.y}[label="${x_row2.permission}",fillcolor="plum"];\n`
                    x_row2= x_row2.right
                }

                x_row = x_row.next
            }

            // definiendo los niveles de cada nodo interno
            x_row = this.rows.first
            while (x_row){
                grafo += "{rank=same;" + "Noderow"+ x_row.id.replace(".", "").replace("(", "").replace(")", "") + ";"
                let x_row2 = x_row.access
                while (x_row2){
                    grafo += `Node${x_row2.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.y};`
                    x_row2= x_row2.right
                }

                x_row = x_row.next
                grafo += "}\n"
            }

            // conexiones verticales de los nodos


            x_row = this.rows.first
            while (x_row){
                let x_row2 = x_row.access
                while (x_row2){
                    if (x_row2.up instanceof HeaderNode){
                        grafo += `Node${x_row2.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.y} -> Node${"col"+x_row2.y} [dir=both];\n`
                    }
                    else{
                        grafo += `Node${x_row2.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.y} ->Node${x_row2.up.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.up.y} [dir=both];\n`

                    }
                    x_row2= x_row2.right
                }

                x_row = x_row.next

            }

            // conexiones horizontales de los nodos

            x_row = this.rows.first
            while (x_row){
                let x_row2 = x_row.access
                while (x_row2){
                    if (x_row2.left instanceof HeaderNode){
                        grafo += `Node${"row"+x_row2.left.id.replace(".", "").replace("(", "").replace(")", "")} -> Node${x_row2.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.y} [dir=both];\n`
                    }
                    else{
                        grafo += `Node${x_row2.left.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.left.y} -> Node${x_row2.x.replace(".", "").replace("(", "").replace(")", "")+x_row2.y} [dir=both];\n`

                    }
                    x_row2= x_row2.right
                }

                x_row = x_row.next

            }


        }




        grafo += "}"


        return grafo


    }

}