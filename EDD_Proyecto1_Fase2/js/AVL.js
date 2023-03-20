
import TreeNode from "./TreeNode";

export default class AVL{
    constructor() {
        this.root = null
    }

    getTreeHeight(node) {
        if (node == null) return 0;
        return node.height;
    }

    findMax(a, b) {
        return a > b ? a : b;
    }

    rRotation(nodito) {
        var left_one = nodito.left;
        var tree2 = left_one.right;

        // Rotación
        left_one.right = nodito;
        nodito.left = tree2;

        // Actualiza alturas
        nodito.height = this.findMax(this.getTreeHeight(nodito.left),
            this.getTreeHeight(nodito.right)) + 1;
        left_one.height = this.getTreeHeight(this.getTreeHeight(left_one.left),
            this.getTreeHeight(left_one.right)) + 1;

        // Retorna nueva root
        return left_one;
    }

    Lrotation(nodito) {
        var right_node = nodito.right;
        var tree2 = right_node.left;

        // Rotación
        right_node.left = nodito;
        nodito.right = tree2;

        // Actualiza alturas
        nodito.height = this.findMax(this.getTreeHeight(nodito.left),
            this.getTreeHeight(nodito.right)) + 1;
        right_node.height = this.findMax(this.getTreeHeight(right_node.left),
            this.getTreeHeight(right_node.right)) + 1;

        // Retorna nueva root
        return right_node;
    }

    // obtiene factor de balance
    getBF(nodito) {
        if (nodito == null) return 0;
        return this.getTreeHeight(nodito.left) - this.getTreeHeight(nodito.right);
    }


    insertStudent(root, student) {
        /* 1. Perform the normal BST insertion */
        if (root == null) return new TreeNode(student);

        if (student.id < root.student.id)
            root.left = this.insertStudent(root.left, student);
        else if (student > root.key)
            root.right = this.insertStudent(root.right, student);
        // Duplicate keys not allowed
        else return root;

        /* 2. Update height of this ancestor root */
        root.height =
            1 + this.getTreeHeight(this.getTreeHeight(root.left),
                this.getTreeHeight(root.right));

        /* 3. Get the balance factor of this ancestor
          root to check whether this root became
          unbalanced */
        var balance = this.getBF(root);

        // If this root becomes unbalanced, then there
        // are 4 cases Left Left Case
        // LL rotation
        if (balance > 1 && student.id < root.left.student.id)
            return this.rRotation(root);

        // RR rotation
        if (balance < -1 && student.id > root.right.student.id)
            return this.Lrotation(root);

        // LR rotation
        if (balance > 1 && student.id > root.left.student.id) {
            root.left = this.Lrotation(root.left);
            return this.rRotation(root);
        }

        // Right Left Case
        if (balance < -1 && student.id < root.right.student.id) {
            root.right = this.rRotation(root.right);
            return this.Lrotation(root);
        }

        /* return the (unchanged) root pointer */
        return root;
    }

    preOrder(node) {
        if (node != null) {
            document.write(node.student.id + " ");
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

}