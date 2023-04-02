import {count_repeatedfiles2} from "./LLFolderHandler.js";

export default class HeaderList{
    constructor(type) {
        this.type = type
        this.first = null
        this.last=null
        this.size = 0
    }

    insert(newHeaderNode){
        this.size++
        newHeaderNode.id2 = this.size
        if (!this.first){
            this.first = newHeaderNode
            this.last = newHeaderNode
        }
        else{
            let actual = this.first
            while (actual.next){
                actual = actual.next
            }

            let extension = "." + newHeaderNode.id.split(".")[1]
            let counter = count_repeatedfiles2(this.first, newHeaderNode.id.replace(extension, ""))
            if (counter !== 0)  {
                if (newHeaderNode.id.endsWith(".png") || newHeaderNode.id.endsWith(".jpeg") ||newHeaderNode.id.endsWith(".jpg") || newHeaderNode.id.endsWith(".tiff") || newHeaderNode.id.endsWith(".gif") || newHeaderNode.id.endsWith(".pdf") || newHeaderNode.id.endsWith(".txt")){
                    let extension = "." + newHeaderNode.id.split(".")[1]
                    newHeaderNode.id = newHeaderNode.id.replace(extension, "")
                    newHeaderNode.id = newHeaderNode.id + "("+ (counter) +")" +extension
                }

        }
            this.last.next = newHeaderNode
            newHeaderNode.previous = this.last
            this.last = newHeaderNode
    }
    }

    printHeaderList(){
        let actual = this.first
        while (actual){
            console.log(actual.id)
            actual = actual.next
        }
    }

    isRepeated(value){
        let actual = this.first
        while (actual){
            if (actual.id === value) return true
            actual = actual.next
        }
        return false
    }

    getHeaderNode(value){
        let actual = this.first
        while (actual){
            if (actual.id === value) return actual
            actual = actual.next
        }
        return null
    }

    findFile(filename){
        let actual = this.first
        while (actual){
            if (actual.id === filename) return true
            actual = actual.next
        }

        return false

    }



}