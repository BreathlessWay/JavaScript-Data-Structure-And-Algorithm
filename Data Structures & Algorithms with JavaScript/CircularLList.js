class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class CircularLList {
	constructor() {
		this.head = null;
		this.length = 0;
	}
	
	get isEmpty() {
		return this.length === 0;
	}
	
	get toString() {
		let current = this.head,
			index = 0,
			string = "";
		while (index < this.length) {
			string += `${current.element},`;
			current = current.next;
			index++;
		}
		return string;
	}
	
	find(item) {
		let current = this.head,
			index = 0;
		while (index < this.length) {
			if (current.element === item) {
				return current;
			}
			index++;
			current = current.next;
		}
		return null;
	}
	
	findPre(item) {
		const itemNode = this.find(item);
		if (itemNode) {
			let current = this.head, index = 0;
			while (index < this.length) {
				if (current.next.element === item) {
					return current;
				}
				index++;
				current = current.next;
			}
		}
		return null;
	}
	
	insert(element, item) {
		const node = new Node(element);
		if (this.isEmpty) {
			this.head = node;
			node.next = this.head;
		} else {
			if (item !== void 0) {
			} else {
				let current = this.head, index = 0;
				while (index < this.length - 1) {
					index++;
					current = current.next;
				}
				current.next = node;
				node.next = this.head;
			}
		}
		
		this.length++;
	}
	
	remove(item) {
		const itemNode = this.findPre(item);
		if (itemNode) {
			if (this.length === 1) {
				this.head = null;
			} else {
				if (this.head === itemNode.next) {
					this.head = itemNode.next.next
					itemNode.next = this.head;
				} else {
					itemNode.next = itemNode.next.next;
				}
			}
			this.length--;
		}
	}
}

const circularLList = new CircularLList();

circularLList.insert(1);
circularLList.insert(7);
circularLList.insert(2);
circularLList.insert(5);

console.log(circularLList.toString);

circularLList.remove(1);

console.log(circularLList.toString);
