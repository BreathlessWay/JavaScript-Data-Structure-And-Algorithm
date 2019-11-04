// 字典=json
class Dictionary {
	constructor() {
		this.items = {};
	}
	
	set(key, value) {
		this.items[key] = value;
	}
	
	delete(key) {
		if (this.has(key)) {
			delete this.items[key];
			return true;
		}
		return false;
	}
	
	has(key) {
		return this.items.hasOwnProperty(key);
	}
	
	get(key) {
		return this.items[key] || undefined;
	}
	
	clear() {
		this.items = {};
	}
	
	get size() {
		return Object.keys(this.items).length;
	}
	
	get keys() {
		return Object.keys(this.items);
	}
	
	get values() {
		return Object.values(this.items);
	}
}
