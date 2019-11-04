// 双链表
class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
		this.prev = null;
	}
}

const _head = Symbol("head"), _length = Symbol("length"), _tail = Symbol("tail");

class DoublyLinkedList {
	constructor() {
		// 第一个元素
		this[_head] = null;
		// 最后一个元素
		this[_tail] = null;
		this[_length] = 0;
	}
	
	append(element) {
		const node = new Node(element);
		if (!this[_head]) {
			this[_head] = this[_tail] = node;
		} else {
			let current = this[_tail];
			this[_tail] = node;
			node.prev = current;
			current.next = node;
		}
		this[_length]++;
	}
	
	insert(position, element) {
		if (position >= 0 && position <= this[_length]) {
			const node = new Node(element);
			
			let current = this[_head],
				previous, index = 0;
			
			if (position === 0) {
				if (!this[_head]) {
					this[_head] = node;
					this[_tail] = node;
				} else {
					node.next = current;
					current.prev = node;
					this[_head] = node;
				}
			} else if (position === this[_length]) {
				current = this[_tail];
				current.next = node;
				node.prev = current;
				this[_tail] = node;
			} else {
				while (index < position) {
					previous = current;
					current = current.next;
					index++;
				}
				node.next = current;
				previous.next = node;
				
				current.prev = node;
				node.prev = previous;
			}
			this[_length]++;
			return true;
		}
		return false;
	}
	
	removeAt(position) {
		if (position > -1 && position < this[_length]) {
			let current = this[_head],
				previous, index = 0;
			if (position === 0) {
				this[_head] = current.next;
				if (this[_length] === 1) {
					this[_tail] = null;
				} else {
					this[_head].prev = null;
				}
			} else if (position === this[_length] - 1) {
				current = this[_tail];
				this[_tail] = current.prev;
				this[_tail].next = null;
			} else {
				while (index < position) {
					previous = current;
					current = current.next;
					index++;
				}
				previous.next = current.next;
				current.next.prev = previous;
			}
			this[_length]--;
			
			return current.element;
		}
		return null;
	}
	
	remove(element) {
		const position = this.indexOf(element);
		return this.removeAt(position);
	}
	
	indexOf(element) {
		let current = this[_head],
			index = 0;
		while (index < this[_length]) {
			if (current.element === element) {
				return index;
			}
			current = current.next;
			index++;
		}
		return -1;
	}
	
	toString() {
		if (!this.isEmpty) {
			let current = this[_head], string = "";
			while (current) {
				string += current.element + (current.next ? "-" : "");
				current = current.next;
			}
			return string;
		}
		return "";
	}
	
	print() {
		if (!this.isEmpty) {
			let current = this[_head];
			while (current) {
				console.log(current.element);
				current = current.next;
			}
		}
	}
	
	get isEmpty() {
		return this[_length] === 0;
	}
	
	get size() {
		return this[_length];
	}
	
	get healEle() {
		return this[_head];
	}
	
	get tailEle() {
		return this[_tail];
	}
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.append(5);
console.log("size", doublyLinkedList.size);
doublyLinkedList.print();

doublyLinkedList.insert(0, 1);
console.log("size", doublyLinkedList.size);
doublyLinkedList.print();

doublyLinkedList.insert(1, 2);
console.log("size", doublyLinkedList.size);
doublyLinkedList.print();

doublyLinkedList.append(6);
console.log("size", doublyLinkedList.size);
doublyLinkedList.print();

console.log("indexOf", doublyLinkedList.indexOf(5));
console.log("toString", doublyLinkedList.toString());

console.log("head", doublyLinkedList.healEle);
console.log("tail", doublyLinkedList.tailEle);

