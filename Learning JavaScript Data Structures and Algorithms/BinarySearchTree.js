// 二叉树：内节点和根节点只会有两个子节点，左边是比节点小的数，右边是大于等于节点的数
// 中序遍历：左=》中=》右
// 先序遍历：中=》左=》右
// 后序遍历：左=》右=》中
class Node {
	constructor(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

const insertNode = (root, node) => {
	// 左小
	if (node.key < root.key) {
		if (root.left) {
			insertNode(root.left, node);
		} else {
			root.left = node;
		}
	} else {
		// 右大
		if (root.right) {
			insertNode(root.right, node);
		} else {
			root.right = node;
		}
	}
};
// 平衡因子：右子树高-左数子树高应该是 0，1，-1，否则需要平衡
const heightNode = (node) => {
	// 没有左子树或者右子树都是-1？
	if (node === null) {
		return -1;
	}
	return Math.max(heightNode(node.left),
		heightNode(node.right) + 1);
};

const rotationRR = (node) => {
	const temp = node.right;
	node.right = temp.left;
	temp.left = node;
	return temp;
};

const rotationLL = (node) => {
	const temp = node.left;
	node.left = temp.right;
	temp.right = node;
	return temp;
};

const rotationLR = (node) => {
	node.left = rotationRR(node.left);
	return rotationLL(node);
};

const rotationRL = (node) => {
	node.right = rotationLL(node.right);
	return rotationRR(node);
};

// 自平衡二叉树AVL
const insertNodeAVL = (node, element) => {
	if (node === null) {
		return new Node(element);
	}
	if (element < node.key) {
		node.left = insertNodeAVL(node.left, element);
		if (heightNode(node.left) - heightNode(node.right) > 1) {
			if (element < node.left.key) {
				node = rotationLL(node);
			} else {
				node = rotationLR(node);
			}
		}
	}
	if (element > node.key) {
		node.right = insertNodeAVL(node.right, element);
		if (heightNode(node.right) - heightNode(node.left) > 1) {
			if (element > node.right.key) {
				node = rotationRR(node);
			} else {
				node = rotationRL(node);
			}
		}
	}
	return node;
};

const inOrderTraverseNode = (node, cb) => {
	if (node !== null) {
		inOrderTraverseNode(node.left, cb);
		cb(node.key);
		inOrderTraverseNode(node.right, cb);
	}
};

const preOrderTraverseNode = (node, cb) => {
	if (node !== null) {
		cb(node.key);
		preOrderTraverseNode(node.left, cb);
		preOrderTraverseNode(node.right, cb);
	}
};

const postOrderTraverseNode = (node, cb) => {
	if (node !== null) {
		postOrderTraverseNode(node.left, cb);
		postOrderTraverseNode(node.right, cb);
		cb(node.key);
	}
};

const searchNode = (node, key) => {
	if (node === null) {
		return false;
	}
	if (key < node.key) {
		return searchNode(node.left, key);
	}
	if (key > node.key) {
		return searchNode(node.right, key);
	}
	if (key === node.key) {
		return true;
	}
};

const findMinNode = (node) => {
	while (node && node.left !== null) {
		node = node.left;
	}
	return node;
};

const removeNode = (node, key) => {
	if (node === null) {
		return null;
	}
	if (key < node.key) {
		node.left = removeNode(node.left, key);
		return node;
	}
	if (key > node.key) {
		node.right = removeNode(node.right, key);
		return node;
	}
	if (key === node.key) {
		// 没有子节点
		if (node.left === null && node.right === null) {
			node = null;
			return node;
		}
		// 只有右节点
		if (node.left === null) {
			node = node.right;
			return node;
		}
		// 只有左节点
		if (node.right === null) {
			node = node.left;
			return node;
		}
		// 既有左节点又有右节点
		// 用右子树中的最小节点代替该节点
		// 并删除右子树的最小节点
		const minNode = findMinNode(node.right);
		node.key = minNode.key;
		node.right = removeNode(node.right, minNode.key);
		return node;
	}
};

class BinarySearchTree {
	constructor() {
		this.root = null;
	}
	
	insert(key) {
		const node = new Node(key);
		if (this.root) {
			insertNode(this.root, node);
		} else {
			this.root = node;
		}
	}
	
	search(key) {
		return searchNode(this.root, key);
	}
	
	remove(key) {
		this.root = removeNode(this.root, key);
	}
	
	// 中序遍历，实现从小到大的排序
	// 接受一个回调作为参数，定义对每一个节点的操作，也叫访问者模式
	inOrderTraverse(cb) {
		inOrderTraverseNode(this.root, cb);
	}
	
	preOrderTraverse(cb) {
		preOrderTraverseNode(this.root, cb);
	}
	
	postOrderTraverse(cb) {
		postOrderTraverseNode(this.root, cb);
	}
	
	get min() {
		let current = this.root;
		while (current && current.left !== null) {
			current = current.left;
		}
		return current.key || null;
	}
	
	get max() {
		let current = this.root;
		while (current && current.right) {
			current = current.right;
		}
		return current.key || null;
	}
}

const binarySearchTree = new BinarySearchTree();
// root
binarySearchTree.insert(11);

binarySearchTree.insert(7);
binarySearchTree.insert(15);
binarySearchTree.insert(5);
binarySearchTree.insert(3);
binarySearchTree.insert(9);
binarySearchTree.insert(8);
binarySearchTree.insert(10);
binarySearchTree.insert(13);
binarySearchTree.insert(12);
binarySearchTree.insert(14);
binarySearchTree.insert(20);
binarySearchTree.insert(18);
binarySearchTree.insert(25);
// insert 递归
binarySearchTree.insert(6);

// binarySearchTree.inOrderTraverse(data => console.log(data));

// binarySearchTree.preOrderTraverse(data => console.log(data));

// binarySearchTree.postOrderTraverse(data => console.log(data));

console.log("min", binarySearchTree.min);
console.log("max", binarySearchTree.max);

console.log(binarySearchTree.search(5));

console.log(JSON.stringify(binarySearchTree.root));

binarySearchTree.remove(6);

console.log(JSON.stringify(binarySearchTree.root));

binarySearchTree.remove(5);

console.log(JSON.stringify(binarySearchTree.root));


binarySearchTree.remove(15);

console.log(JSON.stringify(binarySearchTree.root));
