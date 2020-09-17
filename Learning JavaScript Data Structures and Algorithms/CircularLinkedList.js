// 循环单链表，尾的next指向首
class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

const _head = Symbol("head"), _length = Symbol("length");

class CircularLinkedList {
	constructor() {
		this[_head] = null;
		this[_length] = 0;
	}
	
	append(element) {
		const node = new Node(element);
		if (!this[_head]) {
			this[_head] = node;
		} else {
			let current = this[_head];
			while (current.next !== this[_head]) {
				current = current.next;
			}
			current.next = node;
		}
		node.next = this[_head];
		this[_length]++;
	}
	
	insert(position, element) {
		if (position >= 0 && position <= this[_length]) {
			const node = new Node(element);
			let current = this[_head], index = 0, previous;
			if (position === 0) {
				node.next = current;
				while (current.next !== this[_head]) {
					current = current.next;
				}
				this[_head] = node;
				current.next = this[_head];
			} else {
				while (index < position) {
					previous = current;
					current = current.next;
					index++;
				}
				node.next = current;
				previous.next = node;
				if (node.next === null) {
					node.next = this[_head];
				}
			}
			this[_length]++;
			return true;
		}
		return false;
	}
	
	removeAt(position) {
		if (position > -1 && position < this[_length]) {
			let current = this[_head], index = 0, previous;
			if (position === 0) {
				this[_head] = current.next;
				while (current.next !== this[_head]) {
					current = current.next;
				}
				current.next = this[_head];
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
		if (this[_head]) {
			let current = this[_head], index = 0;
			while (current.element !== element) {
				current = current.next;
				index++;
			}
			return index;
		}
		return -1;
	}
	
	
    toString() {
        let str = '',
            current = this.head,
            index = 0

        while (index < this.length) {
            str += (current?.element + ',')
            current = current?.next
            index++
        }
        console.log(str);
        return str
    }
	
	print() {
		if (!this.isEmpty) {
			let h = this[_head], index = 0;
			while (index < this[_length]) {
				console.log(h.element);
				h = h.next;
				index++;
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

const circularLinkedList = new CircularLinkedList;

circularLinkedList.append(1);
circularLinkedList.append(2);
circularLinkedList.append(8);
circularLinkedList.append(4);


console.log(circularLinkedList.indexOf(8));

circularLinkedList.print();
