// 集合其实是{key:value}的对象
class CustomSet {
	constructor() {
		this.items = {};
	}
	
	add(value) {
		if (!this.has(value)) {
			this.items[value] = value;
			return true;
		}
		return false;
	}
	
	remove(value) {
		if (this.has(value)) {
			delete this.items[value];
			return true;
		}
		return false;
	}
	
	has(value) {
		return this.items.hasOwnProperty(value);
	}
	
	clear() {
		this.items = {};
	}
	// 并集
	union(setData) {
		const selfSet = new CustomSet();
		this.values.forEach(value => {
			selfSet.add(value);
		});
		setData.values.forEach(value => {
			selfSet.add(value);
		});
		return selfSet;
	}
	// 交集
	intersection(setData) {
		const selfSet = new CustomSet();
		this.values.forEach(value => {
			if (setData.has(value)) {
				selfSet.add(value);
			}
		});
		return selfSet;
	}
	// 差集
	difference(setData) {
		const selfSet = new CustomSet();
		this.values.forEach(value => {
			if (!setData.has(value)) {
				selfSet.add(value);
			}
		});
		return selfSet;
	}
	// 子集
	subset(setData) {
		if (this.size > setData.size) {
			return false;
		}
		for (let i = 0; i < this.size; i++) {
			if (!setData.has(this.values[i])) {
				return false;
			}
		}
		return true;
	}
	
	get size() {
		return Object.keys(this.items).length;
	}
	
	get values() {
		return Object.values(this.items);
	}
}

const customSet = new CustomSet();

customSet.add(1);
console.group("add 1");
console.log(customSet.size);
console.log(customSet.values);
console.log(customSet.has(1));
console.groupEnd();

customSet.add(2);
console.group("add 2");
console.log(customSet.size);
console.log(customSet.values);
console.log(customSet.has(2));
console.groupEnd();

customSet.remove(1);
console.group("remove");
console.log(customSet.size);
console.log(customSet.values);
console.log(customSet.has(2));
console.groupEnd();

const baseSet = new CustomSet();
baseSet.add("a");
baseSet.add("b");
baseSet.add("c");
baseSet.add("d");

const unionSet = customSet.union(baseSet);
console.group("union");
console.log(unionSet.size);
console.log(unionSet.values);
console.groupEnd();

baseSet.add(2);
customSet.add("b");
const intersectionSet = customSet.intersection(baseSet);
console.group("intersectionSet");
console.log(intersectionSet.size);
console.log(intersectionSet.values);
console.groupEnd();

customSet.add("m");
const differenceSet = customSet.difference(baseSet);
console.group("differenceSet");
console.log(differenceSet.size);
console.log(differenceSet.values);
console.groupEnd();

const subsetSet = new CustomSet();
subsetSet.add(1);
subsetSet.add(2);
subsetSet.add("b");
subsetSet.add("m");
console.group("subsetSet");
console.log(customSet.subset(subsetSet));
console.log(subsetSet.values);
console.log(customSet.values);
console.groupEnd();
