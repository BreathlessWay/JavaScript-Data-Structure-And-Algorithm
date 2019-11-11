// 将小数组归并成大数组
const merge = (left, right) => {
	let result = [],
		il = 0, ir = 0;
	// 将left和right先按照从小到大的顺序push进result
	while (il < left.length && ir < right.length) {
		if (left[il] < right[ir]) {
			result.push(left[il++]);
		} else {
			result.push(right[ir++]);
		}
	}
	// 因为在上一次的递归中左边数组已经排序完成了
	// 将左边剩余未处理的数push入result
	while (il < left.length) {
		result.push(left[il++]);
	}
	// 因为在上一次的递归中右边数组已经排序完成了
	// 将右边剩余未处理的数push入result
	while (ir < right.length) {
		result.push(right[ir++]);
	}
	return result;
};
// 拆分为小数组，知道每个小数组只有一位
const mergeSortRec = (array) => {
	const len = array.length;
	if (len === 1) {
		return array;
	}
	const midIndex = Math.floor(len / 2),
		left = array.slice(0, midIndex),
		right = array.slice(midIndex, len);
	return merge(mergeSortRec(left), mergeSortRec(right));
};

const partition = (array, left, right) => {
	// 主元
	let pivot = array[Math.floor((left + right) / 2)],
		i = left,
		j = right;
	
	while (i <= j) {
		while (array[i] < pivot) {
			i++;
		}
		while (array[j] > pivot) {
			j--;
		}
		if (i <= j) {
			// 排序点
			[array[i], array[j]] = [array[j], array[i]];
			i++;
			j--;
		}
	}
	return i;
};

const quick = (array, left, right) => {
	let index;
	if (array.length > 1) {
		index = partition(array, left, right);
		if (left < index - 1) {
			quick(array, left, index - 1);
		}
		if (index < right) {
			quick(array, index, right);
		}
	}
};

const heapify = (array, heapSize, i) => {
	let left = i * 2 + 1,
		right = i * 2 + 2,
		largest = i;
	if (left < heapSize && array[left] > array[largest]) {
		largest = left;
	}
	
	if (right < heapSize && array[right] > array[largest]) {
		largest = right;
	}
	if (largest !== i) {
		[array[largest], array[i]] = [array[i], array[largest]];
		heapify(array, heapSize, largest);
	}
};

class ArrayList {
	constructor() {
		this.array = [];
	}
	
	insert(data) {
		this.array.push(data);
	}
	
	toString() {
		return this.array.join();
	}
	
	// 冒泡排序，比较相邻两项，运行时间是最差的
	// 算法复杂度 O(n2)
	bubbleSort() {
		const {size, array} = this;
		console.time("bubbleSort");
		for (let i = 0; i < size; i++) {
			// 减去外循环中已经跑过的轮数
			for (let j = 0; j < size - 1 - i; j++) {
				if (array[j] > array[j + 1]) {
					this.swap(j, j + 1);
				}
			}
		}
		console.timeEnd("bubbleSort");
	}
	
	swap(i, j) {
		[this.array[i], this.array[j]] = [this.array[j], this.array[i]];
	}
	
	// 选择排序
	// 选出最小值的索引，调换位置
	// 算法复杂度也是O(n2)
	selectionSort() {
		const {size, array} = this;
		console.time("selectionSort");
		let indexMin = 0;
		for (let i = 0; i < size; i++) {
			indexMin = i;
			for (let j = i; j < size; j++) {
				if (array[indexMin] < array[j]) {
					indexMin = j;
				}
			}
			if (i !== indexMin) {
				this.swap(i, indexMin);
			}
		}
		console.timeEnd("selectionSort");
	}
	
	// 插入排序，排小数组时比冒泡和选择好
	// 假定第一个值已经是排好的，所以从第二个开始，i=1
	// 感觉和选择排序类似，区别就是选择排序是找到最小值的index，然后交换位置，
	// 插入排序是直接交换位置
	insertionSort() {
		const {size, array} = this;
		console.time("insertionSort");
		let j, temp;
		for (let i = 1; i < size; i++) {
			j = i;
			temp = array[i];
			// 比较，然后排序
			while (j > 0 && array[j - 1] > temp) {
				array[j] = array[j - 1];
				j--;
			}
			array[j] = temp;
		}
		console.timeEnd("insertionSort");
	}
	
	// 归并排序，效率相对较好的
	// 复杂度O(nlogn)
	mergeSort() {
		const {array} = this;
		console.time("mergeSort");
		this.array = mergeSortRec(array);
		console.timeEnd("mergeSort");
	}
	
	// 快速排序
	// 复杂度 O(nlogn)，但是比其他相同复杂度的算法性能好
	// 和归并一样采用分治，将数组分为小数组排序
	// 但是没有拆分数组
	quickSort() {
		const {size, array} = this;
		console.time("quickSort");
		quick(array, 0, size - 1);
		console.timeEnd("quickSort");
	}
	
	// 堆排序
	// 将数组当作二叉树处理
	heapSort() {
		const {size, array} = this;
		for (let i = Math.floor(size / 2); i >= 0; i--) {
			heapify(array, size, i);
		}
		return;
		let heapSize = size;
		while (heapSize > 1) {
			heapSize--;
			this.swap(0, heapSize);
			heapify(array, heapSize, 0);
			
		}
	}
	
	// 顺序搜索
	sequentialSearch(item) {
		const {array, size} = this;
		for (let i = 0; i < size; i++) {
			if (array[i] === item) {
				return i;
			}
		}
		return -1;
	}
	
	// 二分搜索
	// 要求被搜索的数据结构已经排序
	// 类似猜价格，高了降低，低了提高
	binarySearch(item) {
		this.quickSort();
		const {size, array} = this;
		let low = 0,
			high = size - 1,
			mid,
			element;
		
		while (low <= high) {
			mid = Math.floor((low + high) / 2);
			element = array[mid];
			if (element < item) {
				low = mid + 1;
			} else if (element > item) {
				high = mid - 1;
			} else {
				return mid;
			}
		}
	}
	
	get size() {
		return this.array.length;
	}
}


const arrayList = new ArrayList();

arrayList.insert(3);
arrayList.insert(5);
arrayList.insert(1);
arrayList.insert(6);
arrayList.insert(4);
arrayList.insert(7);
arrayList.insert(2);

console.log(arrayList.toString());

// arrayList.bubbleSort();
// arrayList.selectionSort();
// arrayList.insertionSort();
// arrayList.mergeSort();
// arrayList.quickSort();
// arrayList.heapSort();

console.log("index", arrayList.binarySearch(4));

console.log(arrayList.toString());
