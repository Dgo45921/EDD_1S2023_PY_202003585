import N_aryNode from "./N_aryNode.js";
class NaryTree{
    constructor() {
        this.root = new N_aryNode("/")
        this.nodo_creados = 1;
    }

    searchFile(new_folder, file_list){
        // if file_list[1] it means that i am in the root folder
        if (file_list[1] === "" && this.root.first != null ){
            let actual = this.root.first
            while (actual){
                if (actual.file.path === new_folder) return 1
                actual = actual.next
            }
            return 2
        }
        else if (file_list[1] === "" && this.root.first === null) return 5

        else if(file_list[1] !== "" && this.root.first === null){
            return 3
        }

        else if(file_list[1] !== "" && this.root.first !== null){
            let actual = this.root
            let level = file_list.length

            for (let i = 0; i <level ; i++) {
                if (actual !== null) actual = actual.first
                else break
            }

            if (actual !== null){
                actual = actual.first
                while (actual){
                    if (actual.path === new_folder) return 1
                    actual = actual.next
                }
                return 2
            }
            else return 4

        }

    }



    insertFile(path, new_folder){
        let file_list = path.split("/")
        // TODO check if file exists, if so, then create a copy!!!
        // let existing_file = this.searchFile(new_folder, file_list)
        


    }

}