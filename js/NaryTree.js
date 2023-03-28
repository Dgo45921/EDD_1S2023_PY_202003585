import N_aryNode from "./N_aryNode.js";
export default class NaryTree{
    constructor() {
        this.nodo_creados = 1;
        this.root = new N_aryNode("/", 1, "folder")
    }

    searchFolder(new_folder, folder_list){
        //Si la nueva carpeta se creara en la raiz, se buscara si existe o no
        if(folder_list[1] === "" && this.root.first !== null){
            let actual = this.root.first
            while(actual){
                if(actual.path === new_folder && actual.type === "folder"){
                    return 1
                }
                actual = actual.next
            }
            return 2
        }
        //Si la nueva carpeta se creara en la raiz pero no existe ninguna carpeta
        else if (folder_list[1] === "" && this.root.first === null){
            return 5
        }
        //Si la nueva carpeta se creara en algun directorio pero la raiz no posee ninguna carpeta
        else if(folder_list[1] !== "" && this.root.first === null){
            return 3
        }
        //Buscamos el directorio padre y revisar si en sus hijos existe la carpeta
        else if(folder_list[1] !== "" && this.root.first !== null){
            let actual = this.root.first
            let level = folder_list.length
            let position = 1;
            for(let i = 1; i < level; i++){
                if(actual !== null){
                    while(actual){
                        if(position < folder_list.length && folder_list[position] === actual.path){
                            position++
                            if(actual.first !== null && position < folder_list.length){
                                actual = actual.first
                            }
                            break;
                        }else{
                            actual = actual.next
                        }
                    }
                }else{
                    break;
                }
            }
            if(actual !== null){
                actual = actual.first
                while(actual){
                    if(actual.path === new_folder){
                        return 1
                    }
                    actual = actual.next
                }
                return 2
            }else{
                return 4
            }

        }
    }

    insertFolder(new_folder, folder_list){
        /**
         * creamos el nuevo nodo y aumentamos la cantidad de nodos creados
         */
        const new_node = new N_aryNode(new_folder, this.nodo_creados)
        this.nodo_creados++
        //Corroboramos si la insercion es en la raiz y si la raiz no tiene ninguna carpeta
        if(folder_list[1] === "" && this.root.first === null){
            this.root.first = new_node
        }
        //Corroboramos si la insercion es en la raiz y pero la raiz ya tiene carpetas
        else if(folder_list[1] === "" && this.root.first !== null){
            let actual = this.root.first
            while (actual.next){
                actual = actual.next
            }
            actual.next = new_node
        }
        //Corroboramos si la insercion es en algun directorio que no es la raiz
        else if(folder_list[1] !== "" && this.root.first !== null){
            let actual = this.root.first
            let nivel = folder_list.length
            let posicion = 1;
            //Recorremos hasta llegar a la profundidad maxima donde se quiere insertar la nueva carpeta
            for(let i = 1; i < nivel; i++){
                if(actual !== null){
                    while(actual){
                        //Comparamos si las posiciones de la lista de carpetas es igual a la del nodo actual sino seguimos buscando
                        if(posicion < folder_list.length && folder_list[posicion] === actual.path){
                            posicion++
                            //Esta comparacion es para asegurarnos que nos quedaremos en el nodo padre
                            if(actual.first !== null && posicion < folder_list.length){
                                actual = actual.first
                            }
                            break;
                        }else{
                            actual = actual.next
                        }
                    }
                }else{
                    break;
                }
            }
            //Si la carpeta padre ya tiene carpetas se agrega en el primero sino se manda a insertar en el orden correcto
            if(actual.first === null){
                actual.first = new_node
            }else{
                console.log("?")
            }
        }
    }


    insert_folder(ruta, carpeta_nueva){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.searchFolder(carpeta_nueva, lista_carpeta)
        switch(existe_carpeta){
            case 1:
                alert("La carpeta ya existe")
                break;
            case 2:
                this.insertFolder(carpeta_nueva, lista_carpeta)
                break;
            case 3:
                alert("La ruta actual no existe")
                break;
            case 4:
                alert("La ruta actual no es valida")
                break;
            case 5:
                this.insertFolder(carpeta_nueva, lista_carpeta)
                break;
        }
    }







}