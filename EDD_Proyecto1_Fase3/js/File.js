export default class File{
    constructor(name , type, content) {
        this.name = name
        this.type = type
        if (this.type === "folder"){
            this.content = ""
        }
        else{
            this.content = content
        }
    }
}