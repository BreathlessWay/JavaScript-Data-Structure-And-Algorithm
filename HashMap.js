// 散列表其实是数组
const LinkedList = require("./LinkedList");
// 分离链接：每个节点都是存的链表
// 线性探查: 对索引加一
class ValuePair {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
	
	toString() {
		return `[${this.key}-${this.value}]`;
	}
}

// 以散列值作为key
const loseloseHashCode = Symbol("loseloseHashCode"), map = Symbol("map"), djb2HashCode = Symbol("djb2HashCode");

class HashMap {
	constructor() {
		this[map] = [];
	}
	
	linkPut(key, value) {
		const _position = this[loseloseHashCode](key);
		if (this[map][_position] === void 0) {
			console.group("get position in linkPut method");
			console.log(_position + "-" + key);
			console.groupEnd();
			this[map][_position] = new LinkedList();
		}
		this[map][_position].append(new ValuePair(key, value));
	}
	
	linePut(key, value) {
		const _key = this[loseloseHashCode](key);
		if (this[map][_key] === void 0) {
			this[map][_key] = new ValuePair(key, value);
		} else {
			let _index = _key + 1;
			while (this[map][_index] !== void 0) {
				_index++;
			}
			this[map][_index] = new ValuePair(key, value);
		}
	}
	
	linkRemove(key) {
		const _key = this[loseloseHashCode](key);
		if (this[map][_key] !== void 0) {
			let current = this[map][_key].healEle;
			
			while (current.next) {
				if (current.element.key === key) {
					this[map][_key].remove(current.element);
					if (this[map][_key].isEmpty) {
						this[map][_key] = void 0;
					}
					return true;
				}
				current = current.next;
			}
			
			if (current.element.key === key) {
				this[map][_key].remove(current.element);
				if (this[map][_key].isEmpty) {
					this[map][_key] = void 0;
				}
				return true;
			}
		}
		return false;
	}
	
	lineRemove(key) {
		const _key = this[loseloseHashCode](key);
		if (this[map][_key] !== void 0) {
			if (this[map][_key].key === key) {
				this[map][_key] = void 0;
			} else {
				let _index = _key + 1;
				while (this[map][_index] === void 0 || this[map][_index].key !== key) {
					_index++;
				}
				this[map][_index] = void 0;
			}
			return true;
		}
		return false;
	}
	
	linkGet(key) {
		const _key = this[loseloseHashCode](key);
		console.group("linkGet key to ASCII");
		console.log(_key);
		console.groupEnd();
		if (this[map][_key] !== void 0) {
			let current = this[map][_key].healEle;
			
			while (current.next) {
				if (current.element.key === key) {
					return current.element.value;
				}
				current = current.next;
			}
			// 链表最有一个且元素在链表的第一个或元素是链表的最后一个
			if (current.element.key === key) {
				return current.element.value;
			}
		}
		return void 0;
	}
	
	lineGet(key) {
		const _key = this[loseloseHashCode](key);
		if (this[map][_key] !== void 0) {
			if (this[map][_key].key === key) {
				return this[map][_key].value;
			} else {
				let _index = _key + 1;
				while (this[map][_index] === void 0 || this[map][_index].key !== key) {
					_index++;
				}
				return this[map][_index].value;
			}
		}
		return void 0;
	}
	
	linkPrint() {
		this[map].forEach((item, index) => {
			if (item !== void 0) {
				let current = item.healEle;
				while (current) {
					console.log({index}, current.element.key, current.element.value);
					current = current.next;
				}
			}
		});
	}
	
	linePrint() {
		this[map].forEach((item, index) => {
			if (item !== void 0) {
				console.log({index}, item.key, item.value);
			}
		});
	}
	
	// 散列函数
	// 根据给定的key值生成ASCII码值
	[loseloseHashCode](key) {
		let hash = 0;
		for (let i = 0, code; code = key.charCodeAt(i++);) {
			hash += code;
		}
		// 获得比较小的值，用hash值和任意数相除获取余数
		return hash % 37;
	}
	
	// 最受推崇的散列函数
	[djb2HashCode](key) {
		// 赋值一个质数，大多数都用5381
		let hash = 5381;
		for (let i = 0, code; code = key.charCodeAt(i++);) {
			hash = hash * 33 + code;
		}
		return hash % 1013;
	}
}

const linkHashMap = new HashMap();

linkHashMap.linkPut("zhangSan", "zhang san zai na");
linkHashMap.linkPut("liSi", "li si zai gan ma");
linkHashMap.linkPut("wangWu", "wang wu qu na le");

console.group("linkGet from hash map");
console.log(linkHashMap.linkGet("zhaoLiu"));
console.log(linkHashMap.linkGet("zhangSan"));
console.groupEnd();

console.group("linkRemove from hash map");
linkHashMap.linkRemove("liSi");
console.log(linkHashMap.linkGet("liSi"));
console.groupEnd();

console.group("分离链接");
linkHashMap.linkPut("Jonathan", "Jonathan . come");
linkHashMap.linkPut("Jamie", "Jamie . come");
linkHashMap.linkPut("Sue", "Sue . come");
console.log(linkHashMap.linkGet("Jonathan"));
console.log(linkHashMap.linkGet("Jamie"));
console.log(linkHashMap.linkGet("Sue"));
console.groupEnd();

console.group("linkPrint hash map");
linkHashMap.linkPrint();
console.groupEnd();

console.group("线性探查");
const lineHashMap = new HashMap();
lineHashMap.linePut("Jonathan", "Jonathan . come");
lineHashMap.linePut("Jamie", "Jamie . come");
lineHashMap.linePut("Sue", "Sue . come");
lineHashMap.linePut("zhangSan", "zhang san zai na");
lineHashMap.linePut("liSi", "li si zai gan ma");
lineHashMap.linePut("wangWu", "wang wu qu na le");
console.log(lineHashMap.lineGet("Jonathan"));
console.log(lineHashMap.lineGet("liSi"));
lineHashMap.lineRemove("zhangSan");
lineHashMap.linePrint();
console.groupEnd();

console.group("djb2 散列函数");
console.log(lineHashMap[djb2HashCode]("Sun"));
console.groupEnd();
