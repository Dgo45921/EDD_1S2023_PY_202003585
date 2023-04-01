import NaryTree from "./NaryTree.js";
import CircularList from "./CircularList.js";
export default class Student {
    constructor(id, name, password) {
        this.id = id
        this.name = name
        this.password = password
        this.rootFolder = new NaryTree()
        this.bitacora = new CircularList()
    }

}