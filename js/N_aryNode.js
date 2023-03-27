import File from "./File.js";
export default class N_aryNode {
    constructor(id, path, type) {
        this.id = id
        this.path = path
        this.type = type
        this.file_list = null
    }
}