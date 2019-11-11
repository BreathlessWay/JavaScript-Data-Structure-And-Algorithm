const fibonacci = (num) => {
	if (num === 1 || num === 2) {
		return 1;
	}
	return fibonacci(num - 1) + fibonacci(num - 2);
};

// 获取num的斐波那契数
console.log(fibonacci(6));


// es6 尾调用优化
