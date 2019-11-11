// 栈 push/pop
// 使用闭包，IIFE，weakMap实现私有变量
const Stack = (() => {
	// 私有变量
	const items = new WeakMap();
	
	class Stack {
		constructor() {
			items.set(this, []);
		}
		
		push(data) {
			items.get(this).push(data);
		}
		
		pop() {
			return items.get(this).pop();
		}
		
		peek() {
			const length = this.size;
			return items.get(this)[length - 1];
		}
		
		clear() {
			items.set(this, []);
		}
		
		print() {
			console.log(items.get(this));
		}
		
		get size() {
			return items.get(this).length;
		}
		
		get isEmpty() {
			return this.size === 0;
		}
	}
	
	return Stack;
})();

const converter = (number, base) => {
	const stack = new Stack;
	let rem,
		baseString = "",
		digits = "0123456789ABCDEF";
	
	while (number > 0) {
		rem = Math.floor(number % base);
		stack.push(rem);
		number = Math.floor(number / base);
	}
	
	while (!stack.isEmpty) {
		baseString += digits[stack.pop()];
	}
	return baseString;
};

console.log(converter(123, 16));
