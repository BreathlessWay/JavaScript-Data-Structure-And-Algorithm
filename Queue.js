// 队列 push/shift
// 优先队列
const Queue = (() => {
	const items = new WeakMap();
	
	class QueueElement {
		constructor(data, priority) {
			this.data = data;
			this.priority = priority;
		}
	}
	
	class Queue {
		constructor() {
			items.set(this, []);
		}
		
		enqueue(data, priority) {
			let added = false;
			const _items = items.get(this);
			let item = data;
			if (!isNaN(priority)) {
				item = new QueueElement(data, priority);
				for (let i = 0; i < this.size; i++) {
					const v = _items[i];
					if (item.priority < v.priority) {
						_items.splice(i, 0, item);
						added = true;
						break;
					}
				}
			}
			if (!added) {
				_items.push(item);
			}
		}
		
		dequeue() {
			return items.get(this).shift();
		}
		
		front() {
			return items.get(this)[0];
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
	
	return Queue;
})();
// 优先队列
const queue = new Queue;
console.group("================");
queue.enqueue(1, 1);
queue.enqueue(2, 2);
queue.enqueue(4, 1);

queue.print();
console.log(queue.front());
console.log(queue.size);
console.groupEnd();

console.group("================");

const names = ["张三", "李四", "王五", "赵六", "孙七", "郑八", "钱九", "周十"];
// 循环队列
const hotPotato = (nameList, num) => {
	const queue = new Queue;
	
	names.forEach(name => {
		queue.enqueue(name);
	});
	
	let eliminated = "";
	
	while (queue.size > 1) {
		for (let i = 0; i < num; i++) {
			queue.enqueue(queue.dequeue());
		}
		eliminated = queue.dequeue();
		console.log(`${eliminated}被淘汰了！！！`);
	}
	
	return queue.front();
	
};

const winner = hotPotato(names, 8);

console.log(winner + "赢了!!!");
console.groupEnd();
