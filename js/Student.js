import NaryTree from "./NaryTree.js";
export default class Student {
    constructor(id, name, password) {
        this.id = id
        this.name = name
        this.password = password
        this.rootFolder = new NaryTree()
    }

}