class Node {
	constructor(element) {
		this.element = element;
		this.previous = null;
		this.next = null;
	}
}

class DoublyLList {
	constructor() {
		this.head = null;
		this.length = 0;
	}
	
	get isEmpty() {
		return this.length === 0;
	}
	
	get toString() {
		let current = this.head, string = "";
		while (current) {
			string += `${current.element},`;
			current = current.next;
		}
		return string;
	}
	
	get toStringReverse() {
		let current = this.last, string = "";
		while (current) {
			string += `${current.element},`;
			current = current.previous;
		}
		return string;
	}
	
	get last() {
		let current = this.head;
		while (current && current.next) {
			current = current.next;
		}
		return current;
	}
	
	find(item) {
		let current = this.head;
		while (current) {
			if (current.element === item) {
				return current;
			}
			current = current.next;
		}
		return null;
	}
	
	insert(element, item) {
		const node = new Node(element);
		if (item !== void 0) {
			const itemNode = this.find(item);
			if (itemNode) {
				const pre = itemNode.previous;
				pre.next = itemNode.previous = node;
				node.previous = pre;
				node.next = itemNode;
			}
		} else {
			if (this.isEmpty) {
				this.head = node;
			} else {
				let current = this.head;
				while (current.next) {
					current = current.next;
				}
				current.next = node;
				node.previous = current;
			}
		}
		this.length++;
	}
	
	remove(item) {
		const itemNode = this.find(item);
		if (itemNode) {
			const pre = itemNode.previous,
				next = itemNode.next;
			if (pre && next) {
				pre.next = next;
				next.previous = pre;
			} else if (next) {
				this.head = this.head.next;
				this.head.previous = null;
			} else if (pre) {
				pre.next = null;
			}
			this.length--;
		}
	}
}

const doublyLList = new DoublyLList();

doublyLList.insert(1);
doublyLList.insert(4);
doublyLList.insert(2);
doublyLList.insert(7);

doublyLList.remove(7);

console.log(doublyLList.toString);
console.log(doublyLList.toStringReverse);
