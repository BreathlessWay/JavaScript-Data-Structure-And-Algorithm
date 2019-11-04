// 单链表
class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

const _head = Symbol("head"),
	_length = Symbol("length");

class LinkedList {
	constructor() {
		// 第一个节点
		this[_head] = null;
		this[_length] = 0;
	}
	
	append(element) {
		const node = new Node(element);
		let current = null;
		if (!this[_head]) {
			this[_head] = node;
		} else {
			current = this[_head];
			while (current.next) {
				current = current.next;
			}
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
				this[_head] = node;
				this[_head].next = current;
			} else {
				while (index < position) {
					previous = current;
					current = current.next;
					index++;
				}
				node.next = current;
				previous.next = node;
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
			} else {
				while (index < position) {
					previous = current;
					current = current.next;
					index++;
				}
				previous.next = current.next;
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
		while (current) {
			if (current.element === element) {
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	}
	
	toString() {
		let current = this[_head],
			string = "";
		while (current) {
			string += current.element + (current.next ? "-" : "");
			current = current.next;
		}
		return string;
	}
	
	print() {
		if (!this.isEmpty) {
			let h = this[_head];
			while (h) {
				console.log(h.element);
				h = h.next;
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
}

const linkedList = new LinkedList();

linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);

linkedList.removeAt(1);

linkedList.insert(1, 8);

console.log("toString", linkedList.toString());

console.log("indexOf", linkedList.indexOf(3));

console.log("head", linkedList.head);

console.log("linkedList", linkedList);

linkedList.print();

module.exports = LinkedList;
