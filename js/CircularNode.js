export  default class CircularNode{
    constructor(action) {
        this.action = action
        this.next1 = null
        this.next2 = null // attribute that will make a copy of the list but without the circular behavior and create the json file
        this.id = 0
    }


}