export default class InternalNode{
    constructor(x="", y="", permission="") {
        this.permission = permission
        this.x=x
        this.y=y
        this.up = null
        this.down=null
        this.right=null
        this.left=null

        this.xCoordinate = 0
        this.yCoordinate = 0
    }
}