class Stack {
	constructor() {
		this.dataSource = [];
	}
	
	get size() {
		return this.dataSource.length;
	}
	
	get isEmpty() {
		return this.size === 0;
	}
	
	get toString() {
		return this.dataSource.join("");
	}
	
	push(element) {
		this.dataSource.push(element);
	}
	
	pop() {
		return this.dataSource.pop();
	}
	
	peek() {
		if (this.isEmpty) {
			return void 0;
		}
		return this.dataSource[this.size - 1];
	}
	
	clear() {
		this.dataSource = [];
	}
}

// 进制转换
const mulBase = (number, base) => {
	const stack = new Stack(),
		digits = "0123456789ABCDEF";
	let converted = "";
	
	while (number) {
		stack.push(number % base);
		number = Math.floor(number / base);
	}
	
	while (!stack.isEmpty) {
		converted += digits[stack.pop()];
	}
	console.log(converted);
	return converted;
};

mulBase(3, 2);

// 回文
const isPalindrome = (word) => {
	const _word = word.toString(),
		stack = new Stack();
	for (let i = 0; i < _word.length; i++) {
		stack.push(_word[i]);
	}
	let rword = "";
	while (!stack.isEmpty) {
		rword += stack.pop();
	}
	console.log(rword === _word);
	return rword === _word;
};

isPalindrome(1001);

// 对称括号
const balanceBracket = (brackets) => {
	const stack = new Stack(),
		left = "({[",
		right = ")}]";
	
	let balanced = true;
	
	for (let i = 0; i < brackets.length; i++) {
		const bracket = brackets[i];
		if (left.indexOf(bracket) > -1) {
			stack.push(bracket);
		} else if (stack.isEmpty) {
			balanced = false;
		} else {
			const top = stack.pop();
			if (left.indexOf(top) !== right.indexOf(bracket)) {
				balanced = false;
			}
		}
	}
	console.log(balanced && stack.isEmpty);
	return balanced && stack.isEmpty;
};

balanceBracket("({[])");

// 中缀表达式=》后缀表达式
// 什么是中缀表达式，后缀表达式，参考https://blog.csdn.net/u012507347/article/details/52245233
// 1. 建立符号栈
// 2. 顺序扫描中序表达式
// 3. a） 是数字， 直接输出
//    b） 是运算符
//      i : “(” 直接入栈
//      ii : “)” 将符号栈中的元素依次出栈并输出, 直到 “(“, “(“只出栈, 不输出
//      iii: 其他符号, 将符号栈中的元素依次出栈并输出, 直到 遇到比当前符号优先级更低的符号或者”(“。 将当前符号入栈。
// 4. 扫描完后, 将栈中剩余符号依次输出

const getPriority = (operator) => {
	switch (operator) {
		case "+":
		case "-":
			return 1;
		case "*":
		case "/":
			return 2;
		default:
			return 0;
	}
};

const outputOperator = (opStrack, numStrack, chart) => {
	const _op = opStrack.peek(),
		opPriority = getPriority(_op),
		chartPriority = getPriority(chart);
	if (opPriority < chartPriority) {
		opStrack.push(chart);
	} else {
		numStrack.push(opStrack.pop());
		outputOperator(opStrack, numStrack, chart);
	}
};

const dal2Rpn = (exp) => {
	const numStack = new Stack(),
		opStack = new Stack();
	
	const operators = "+-*/()";
	
	for (let i = 0; i < exp.length; i++) {
		const chart = exp[i];
		if (chart.trim() !== "") {
			if (operators.indexOf(chart) > -1) {
				if (chart === "(") {
					opStack.push(chart);
				} else if (chart === ")") {
					while (!opStack.isEmpty) {
						const _op = opStack.pop();
						if (_op === "(") {
							break;
						} else {
							numStack.push(_op);
						}
					}
				} else {
					outputOperator(opStack, numStack, chart);
				}
			} else {
				numStack.push(chart);
			}
		}
	}
	
	while (!opStack.isEmpty) {
		const _op = opStack.pop();
		numStack.push(_op);
	}
	
	const rpn = numStack.toString,
		calcStack = new Stack();
	
	for (let i = 0; i < rpn.length; i++) {
		const chart = rpn[i];
		if (!isNaN(chart)) {
			calcStack.push(Number(chart));
		}
		if (operators.indexOf(chart) > -1) {
			const top = calcStack.pop(),
				preTop = calcStack.pop();
			const data = eval(`${preTop}${chart}${top}`);
			calcStack.push(data);
		}
	}
	
	console.log(numStack.toString); // 325-6*3/+
	
	console.log(calcStack.toString); // -3
	
	return calcStack.toString;
};

dal2Rpn("3+(2-5)*6/3");

const getRightThing = (array, target) => {
	const targetStack = new Stack(),
		originalStack = new Stack();
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		if (item !== target) {
			originalStack.push(item);
		} else {
			targetStack.push(item);
		}
	}
	console.log(originalStack.toString);
	return originalStack.toString;
};

getRightThing([1, 2, 3, 3, 2, 1, 1, 3, 2, 2, 1, 3, 2, 3, 1], 3);
