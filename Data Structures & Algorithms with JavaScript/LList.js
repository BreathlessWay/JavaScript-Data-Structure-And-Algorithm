class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class LList {
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
	
	append(element) {
		const node = new Node(element);
		if (this.isEmpty) {
			this.head = node;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = node;
		}
		this.length++;
	}
	
	insert(element, item) {
		const index = this.indexOf(item);
		if (index > -1) {
			const node = new Node(element);
			const pre = this.findPre(item);
			if (pre) {
				const next = pre.next;
				pre.next = node;
				node.next = next;
			} else {
				node.next = this.head;
				this.head = node;
			}
			this.length++;
		}
	}
	
	remove(item) {
		const index = this.indexOf(item);
		if (index > -1) {
			const pre = this.findPre(item);
			if (pre) {
				pre.next = pre.next.next;
			} else {
				this.head = this.head.next;
			}
			this.length--;
		}
	}
	
	find(item) {
		let current = this.head;
		while (current && current.element !== item) {
			current = current.next;
		}
		return current;
	}
	
	findPre(item) {
		let current = this.head;
		while (current && current.next) {
			if (current.next.element === item) {
				return current;
			}
			current = current.next;
		}
		return null;
	}
	
	indexOf(item) {
		let index = 0, current = this.head;
		while (current) {
			if (current.element === item) {
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	}
}

const llist = new LList();

llist.append(1);
llist.append(5);
llist.append(2);

console.log(llist.remove(1));

console.log(llist.toString);
