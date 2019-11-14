class Dancer {
	constructor({sex, name}) {
		this.sex = sex;
		this.name = name;
	}
}

class PriorityElement {
	constructor({element, priority}) {
		this.element = element;
		this.priority = priority;
	}
}

class Queue {
	constructor() {
		this.dataStore = [];
	}
	
	get size() {
		return this.dataStore.length;
	}
	
	get isEmpty() {
		return this.size === 0;
	}
	
	get toString() {
		return this.dataStore.toString();
	}
	
	enqueue(element) {
		this.dataStore.push(element);
	}
	
	priorityEnqueue(element, priority) {
		const {size, dataStore} = this;
		const priorityElement = new PriorityElement({element, priority});
		if (!size) {
			dataStore.push(priorityElement);
		}
		for (let i = 0; i < size; i++) {
			const item = dataStore[i];
			if (priorityElement.priority > item.priority) {
				dataStore.splice(i, 0, priorityElement);
				break;
			}
		}
	}
	
	unshift(element) {
		this.dataStore.unshift(element);
	}
	
	dequeue() {
		return this.dataStore.shift();
	}
	
	pop() {
		return this.dataStore.pop();
	}
	
	front() {
		return this.dataStore[0];
	}
	
	end() {
		return this.dataStore[this.size - 1];
	}
	
	clear() {
		this.dataStore = [];
	}
}

// 方块舞
const dance = (array) => {
	const femaleQueue = new Queue(),
		maleQueue = new Queue();
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		const dancer = new Dancer(item);
		if (dancer.sex === "female") {
			femaleQueue.enqueue(dancer);
		}
		if (dancer.sex === "male") {
			maleQueue.enqueue(dancer);
		}
	}
	
	while (!femaleQueue.isEmpty && !maleQueue.isEmpty) {
		console.log(`female ${femaleQueue.dequeue().name} and male ${maleQueue.dequeue().name} will dance`);
	}
};
const array = [{
	sex: "female",
	name: "张三"
}, {
	sex: "male",
	name: "李丽"
}, {
	sex: "female",
	name: "王五"
}, {
	sex: "male",
	name: "赵美丽"
}, {
	sex: "female",
	name: "钱万"
}, {
	sex: "male",
	name: "孙微"
}, {
	sex: "female",
	name: "周时"
}, {
	sex: "male",
	name: "吴彩"
}];
dance(array);

const radixSort = (array) => {
	const queues = [];
	for (let i = 0; i < 10; i++) {
		queues.push(new Queue());
	}
	
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		const _data = item % 10;
		queues[_data].enqueue(item);
	}
	const newArray = [];
	for (let i = 0; i < queues.length; i++) {
		const queue = queues[i];
		while (!queue.isEmpty) {
			newArray.push(queue.dequeue());
		}
	}
	
	for (let i = 0; i < newArray.length; i++) {
		const item = newArray[i];
		const _data = Math.floor(item / 10);
		queues[_data].enqueue(item);
	}
	const sortArray = [];
	for (let i = 0; i < queues.length; i++) {
		const queue = queues[i];
		while (!queue.isEmpty) {
			sortArray.push(queue.dequeue());
		}
	}
	
	console.log(sortArray);
};

const sortArray = [45, 72, 93, 51, 21, 16, 70, 41, 27, 31];

radixSort(sortArray);

// 优先队列
const pQueue = () => {
	const queue = new Queue();
	queue.priorityEnqueue(1, 1);
	queue.priorityEnqueue(4, 4);
	queue.priorityEnqueue(2, 2);
	queue.priorityEnqueue(3, 3);
	queue.priorityEnqueue(6, 6);
	while (!queue.isEmpty) {
		console.log(queue.dequeue());
	}
};
pQueue();
