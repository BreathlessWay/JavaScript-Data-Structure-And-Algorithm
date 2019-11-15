class Dictionary {
	constructor() {
		this.dataStore = {};
	}
	
	get size() {
		return Object.keys(this.dataStore).length;
	}
	
	get toString() {
		return Object.entries(this.dataStore);
	}
	
	add(key, value) {
		this.dataStore[key] = value;
	}
	
	find(key) {
		return this.dataStore[key];
	}
	
	remove(key) {
		delete this.dataStore[key];
	}
	
	clear() {
		this.dataStore = {};
	}
}
