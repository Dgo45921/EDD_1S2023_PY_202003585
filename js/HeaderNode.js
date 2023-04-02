export default class HeaderNode{
    constructor(id) {
        this.id=id
        this.next = null
        this.previous = null
        this.access = null
        this.content = ""
        this.id2 = 0
        this.abs_path = ""
    }
}