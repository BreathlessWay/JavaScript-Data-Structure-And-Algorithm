class List {
	constructor() {
		this.dataStore = [];
		this.pos = 0;
	}
	
	get listSize() {
		return this.dataStore.length;
	}
	
	get length() {
		return this.listSize;
	}
	
	clear() {
		this.pos = 0;
		this.dataStore = [];
	}
	
	find(element) {
		return this.dataStore.indexOf(element);
	}
	
	toString() {
		return this.dataStore.toString();
	}
	
	getElement() {
		return this.dataStore[this.pos];
	}
	
	insert(element) {
		try {
			this.dataStore.unshift(element);
			return true;
		} catch (e) {
			return false;
		}
	}
	
	append(element) {
		this.dataStore.push(element);
	}
	
	remove(element) {
		const _index = this.find(element);
		if (_index > -1) {
			this.dataStore.splice(_index, 1);
		}
	}
	
	front() {
		this.pos = 0;
	}
	
	end() {
		this.pos = this.listSize - 1;
	}
	
	prev() {
		if (this.pos) {
			this.pos--;
		}
	}
	
	next() {
		if (this.pos < this.listSize - 1) {
			this.pos++;
		}
	}
	
	hasNext() {
		return this.pos < this.listSize - 1;
	}
	
	hasPrev() {
		return this.pos > 0;
	}
	
	currPos() {
		return this.pos;
	}
	
	moveTo(position) {
		this.pos = position;
	}
	
	contains(element) {
		const _index = this.find(element);
		return _index > -1;
	}
}
