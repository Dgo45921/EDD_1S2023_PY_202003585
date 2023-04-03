import FileMatrix from "./FileMatrix.js";

export default class N_aryNode {
    constructor(path, id) {
        this.first = null
        this.id = id
        this.path = path
        this.next = null
        this.absolute_path = "/"
        this.matrix = new FileMatrix(this.path)
    }
}